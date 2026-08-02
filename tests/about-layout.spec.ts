import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

test("about content remains maintainable as standard Markdown", () => {
  const source = readFileSync("src/pages/about.md", "utf8");

  expect(source).toContain("## 我现在在做什么");
  expect(source).toContain("## 我的人生信念");
  expect(source).not.toContain("多维表格研发");
  expect(source).not.toMatch(/<\/?[a-z][^>]*>/i);
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
    page.getByRole("heading", { name: "我现在在做什么", level: 2 })
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

for (const width of [390, 1440]) {
  test(`beliefs adapt their columns at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/about");

    const positions = await page.evaluate(() => {
      const heading = Array.from(document.querySelectorAll("#about h2")).find(
        element => element.textContent?.trim() === "我的人生信念"
      );
      const list = heading?.nextElementSibling;
      const items = list ? Array.from(list.children).slice(0, 2) : [];

      if (items.length < 2) throw new Error("Expected at least two beliefs");

      return items.map(item => {
        const rect = item.getBoundingClientRect();
        return { top: Math.round(rect.top), bottom: Math.round(rect.bottom) };
      });
    });

    if (width >= 768) {
      expect(positions[1].top).toBe(positions[0].top);
    } else {
      expect(positions[1].top).toBeGreaterThan(positions[0].bottom);
    }
  });
}
