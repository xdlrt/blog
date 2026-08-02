import { expect, test } from "@playwright/test";

const longPostPath = "/posts/46e98018";

for (const width of [360, 390]) {
  test(`wide article tables scroll locally without widening the ${width}px page`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto(longPostPath);

    const layout = await page.evaluate(() => {
      const table = document.querySelector("#article table");

      if (!(table instanceof HTMLElement)) {
        throw new Error("Expected the long article to contain a table");
      }

      return {
        documentClientWidth: document.documentElement.clientWidth,
        documentScrollWidth: document.documentElement.scrollWidth,
        tableClientWidth: table.clientWidth,
        tableScrollWidth: table.scrollWidth,
      };
    });

    expect(layout.documentScrollWidth).toBe(layout.documentClientWidth);
    expect(layout.tableScrollWidth).toBeGreaterThan(layout.tableClientWidth);
  });
}

for (const width of [640, 768]) {
  test(`article return link shares the title axis at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(longPostPath);

    const axes = await page.evaluate(() => {
      const returnLink = document.querySelector(".back-button");
      const title = document.querySelector(".post-title");

      if (!returnLink || !title) {
        throw new Error("Expected the article return link and title");
      }

      return {
        returnLinkLeft: Math.round(returnLink.getBoundingClientRect().left),
        titleLeft: Math.round(title.getBoundingClientRect().left),
      };
    });

    expect(axes.returnLinkLeft).toBe(axes.titleLeft);
  });
}

test("desktop article copy uses a 17px by 32px wide reading measure", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1200, height: 900 });
  await page.goto(longPostPath);

  const measure = await page.locator("#article").evaluate(article => {
    const styles = getComputedStyle(article);
    return {
      fontSize: styles.fontSize,
      lineHeight: styles.lineHeight,
      width: Math.round(article.getBoundingClientRect().width),
    };
  });

  expect(measure).toEqual({
    fontSize: "17px",
    lineHeight: "32px",
    width: 864,
  });
});

test("about copy shares the desktop reading measure", async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 900 });
  await page.goto("/about");

  const measure = await page.locator("#about").evaluate(about => {
    const styles = getComputedStyle(about);
    return {
      fontSize: styles.fontSize,
      lineHeight: styles.lineHeight,
      width: Math.round(about.getBoundingClientRect().width),
    };
  });

  expect(measure).toEqual({
    fontSize: "17px",
    lineHeight: "32px",
    width: 864,
  });
});

test("mobile pages do not force a permanent vertical scrollbar gutter", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto(longPostPath);

  const rootOverflowY = await page.locator("html").evaluate(element =>
    getComputedStyle(element).overflowY
  );

  expect(rootOverflowY).toBe("auto");
});

test("desktop pages reserve a stable scrollbar gutter", async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 900 });
  await page.goto("/tags");

  const scrollbarGutter = await page.locator("html").evaluate(element =>
    getComputedStyle(element).scrollbarGutter
  );

  expect(scrollbarGutter).toBe("stable");
});

for (const [width, expectedDisplayWidth] of [
  [1024, "64rem"],
  [1600, "72rem"],
] as const) {
  test(`layout display width is ${expectedDisplayWidth} at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(longPostPath);

    const displayWidth = await page.locator("html").evaluate(element =>
      getComputedStyle(element).getPropertyValue("--layout-display-width").trim()
    );

    expect(displayWidth).toBe(expectedDisplayWidth);
  });
}
