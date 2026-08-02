import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

test("about content remains maintainable as standard Markdown", () => {
  const source = readFileSync("src/pages/about.md", "utf8");

  expect(source).toContain("## 现在");
  expect(source).toContain("## 我相信的原则");
  expect(source).toContain("## 我的实践");
  expect(source).toContain("## 为什么写作");
  expect(source).not.toContain("多维表格研发");
  expect(source).not.toMatch(/<\/?[a-z][^>]*>/i);
});

test("about page reads as an editorial profile", async ({ page }) => {
  await page.goto("/about");

  await expect(
    page.getByText("产品工程师 · 长期写作者 · 从 2016 年开始写博客")
  ).toBeVisible();
  await expect(page.locator("#about > h2")).toHaveCount(4);
  await expect(
    page.getByRole("heading", { name: "我的实践", level: 2 })
  ).toBeVisible();
  await expect(
    page.getByText("所有的努力都是为了拥有更多选择的权利。")
  ).toHaveCount(1);
  await expect(page.locator("#about blockquote")).toContainText(
    "所有的努力"
  );
});

test("about navigation exposes the current page and theme action", async ({
  page,
}) => {
  await page.goto("/about");

  await expect(
    page.getByRole("navigation").getByRole("link", { name: "关于我" })
  ).toHaveAttribute("aria-current", "page");
  await expect(page.locator("#theme-btn")).toHaveAttribute(
    "aria-label",
    /切换到(深色|浅色)模式/
  );
});

for (const width of [390, 1440]) {
  test(`about page keeps one content axis at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/about");

    await expect(page.locator(".breadcrumb")).toHaveCount(0);

    const axes = await page.evaluate(() => {
      const title = document.querySelector(".about-header h1");
      const firstSectionTitle = document.querySelector("#about h2");

      if (!title || !firstSectionTitle) {
        throw new Error("Expected the about title and first section title");
      }

      return {
        titleLeft: Math.round(title.getBoundingClientRect().left),
        sectionLeft: Math.round(firstSectionTitle.getBoundingClientRect().left),
      };
    });

    expect(axes.sectionLeft).toBe(axes.titleLeft);
  });
}

test("about page has a clear Markdown content hierarchy", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/about");

  await expect(
    page.getByRole("heading", { name: "现在", level: 2 })
  ).toBeVisible();

  const headingSizes = await page.evaluate(() => {
    const h2 = document.querySelector("#about h2");
    const h3 = document.querySelector("#about h3");

    if (!h2 || !h3) throw new Error("Expected h2 and h3 headings");

    return {
      h2: Number.parseFloat(getComputedStyle(h2).fontSize),
      h3: Number.parseFloat(getComputedStyle(h3).fontSize),
    };
  });

  expect(headingSizes.h2 - headingSizes.h3).toBeGreaterThanOrEqual(8);
  await expect(
    page.getByRole("link", { name: "GitHub", exact: true })
  ).toBeVisible();
});

test("about page uses its statement and project as visual anchors", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/about");

  const appearance = await page.evaluate(() => {
    const quote = document.querySelector("#about blockquote");
    const project = Array.from(document.querySelectorAll("#about > h3")).find(
      element => element.textContent?.trim() === "Markdowns"
    );

    if (!quote || !project) throw new Error("Expected quote and project");

    const quoteStyle = getComputedStyle(quote);
    return {
      quoteFontSize: Number.parseFloat(quoteStyle.fontSize),
      quoteBorderWidth: quoteStyle.borderLeftWidth,
      projectFontSize: Number.parseFloat(getComputedStyle(project).fontSize),
    };
  });

  expect(appearance.quoteFontSize).toBeGreaterThanOrEqual(24);
  expect(appearance.quoteBorderWidth).toBe("0px");
  expect(appearance.projectFontSize).toBeGreaterThanOrEqual(30);
});

for (const [width, minTitleSize, maxTitleSize] of [
  [390, 40, 48],
  [768, 44, 56],
  [1440, 58, 62],
] as const) {
  test(`about typography scales smoothly at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/about");

    const typography = await page.evaluate(() => {
      const title = document.querySelector(".about-header h1");
      const finalHeading = Array.from(
        document.querySelectorAll("#about > h2")
      ).find(element => element.textContent?.trim() === "为什么写作");
      const paragraph = finalHeading?.nextElementSibling;

      if (!title || !paragraph) {
        throw new Error("Expected title and final narrative paragraph");
      }

      return {
        titleSize: Number.parseFloat(getComputedStyle(title).fontSize),
        paragraphWidth: Math.round(paragraph.getBoundingClientRect().width),
      };
    });

    expect(typography.titleSize).toBeGreaterThanOrEqual(minTitleSize);
    expect(typography.titleSize).toBeLessThanOrEqual(maxTitleSize);
    expect(typography.paragraphWidth).toBeLessThanOrEqual(704);
  });
}

for (const width of [390, 768, 1024, 1440]) {
  test(`beliefs adapt their columns at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/about");

    const positions = await page.evaluate(() => {
      const heading = Array.from(document.querySelectorAll("#about h2")).find(
        element => element.textContent?.trim() === "我相信的原则"
      );
      const list = heading?.nextElementSibling;
      const items = list ? Array.from(list.children) : [];

      if (items.length !== 5) throw new Error("Expected five beliefs");

      return items.map(item => {
        const rect = item.getBoundingClientRect();
        return {
          left: Math.round(rect.left),
          top: Math.round(rect.top),
          bottom: Math.round(rect.bottom),
        };
      });
    });

    const columns = new Set(positions.map(position => position.left));

    if (width >= 1024) {
      expect(columns.size).toBe(2);
      expect(positions[1].left).toBe(positions[0].left);
    } else {
      expect(columns.size).toBe(1);
      expect(positions[1].top).toBeGreaterThan(positions[0].bottom);
    }
  });
}

for (const [width, expectedColumns] of [
  [390, 1],
  [768, 2],
  [1024, 4],
] as const) {
  test(`working method uses ${expectedColumns} column(s) at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/about");

    const columns = await page.evaluate(() => {
      const heading = Array.from(document.querySelectorAll("#about h3")).find(
        element => element.textContent?.trim() === "工作方法"
      );
      const list = heading?.nextElementSibling;
      const items = list ? Array.from(list.children) : [];

      if (items.length !== 4) throw new Error("Expected four working steps");

      return new Set(
        items.map(item => Math.round(item.getBoundingClientRect().left))
      ).size;
    });

    expect(columns).toBe(expectedColumns);
  });
}

test("working method content shares each column's left axis", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/about");

  const offsets = await page.evaluate(() => {
    const heading = Array.from(document.querySelectorAll("#about h3")).find(
      element => element.textContent?.trim() === "工作方法"
    );
    const list = heading?.nextElementSibling;
    const items = list ? Array.from(list.children) : [];

    if (items.length !== 4) throw new Error("Expected four working steps");

    return items.map(item => {
      const itemLeft = item.getBoundingClientRect().left;
      const title = item.querySelector("h4");
      const paragraph = item.querySelector("p");

      if (!title || !paragraph) {
        throw new Error("Expected a title and paragraph in each working step");
      }

      return {
        title: Math.round(title.getBoundingClientRect().left - itemLeft),
        paragraph: Math.round(
          paragraph.getBoundingClientRect().left - itemLeft
        ),
      };
    });
  });

  expect(offsets).toEqual([
    { title: 0, paragraph: 0 },
    { title: 0, paragraph: 0 },
    { title: 0, paragraph: 0 },
    { title: 0, paragraph: 0 },
  ]);
});
