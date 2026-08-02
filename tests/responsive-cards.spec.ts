import { expect, test } from "@playwright/test";

const desktopWidths = [721, 768, 1024, 1440];

for (const width of desktopWidths) {
  test(`regular editorial card links do not overlap at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    const links = page.locator(
      "#recent-posts .article-card:not(.article-card-lead) > a"
    );
    const first = await links.nth(0).boundingBox();
    const second = await links.nth(1).boundingBox();

    expect(first).not.toBeNull();
    expect(second).not.toBeNull();

    const overlapsHorizontally =
      first!.x < second!.x + second!.width &&
      first!.x + first!.width > second!.x;
    const overlapsVertically =
      first!.y < second!.y + second!.height &&
      first!.y + first!.height > second!.y;

    expect(overlapsHorizontally && overlapsVertically).toBe(false);
  });

  test(`recent post titles keep the section's left axis at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    const heading = await page
      .locator("#recent-posts .section-heading h2")
      .boundingBox();
    const leadTitle = await page
      .locator("#recent-posts .article-card-lead .card-title")
      .boundingBox();
    const regularTitle = await page
      .locator(
        "#recent-posts .article-card:not(.article-card-lead) .card-title"
      )
      .first()
      .boundingBox();

    expect(heading).not.toBeNull();
    expect(leadTitle).not.toBeNull();
    expect(regularTitle).not.toBeNull();
    expect(Math.abs(leadTitle!.x - heading!.x)).toBeLessThanOrEqual(0.5);
    expect(Math.abs(regularTitle!.x - heading!.x)).toBeLessThanOrEqual(0.5);
  });
}

test("homepage switches from a single column to two columns at 768px", async ({
  page,
}) => {
  const links = page.locator(
    "#recent-posts .article-card:not(.article-card-lead) > a"
  );
  const archiveNote = page.locator(".archive-note");

  await page.setViewportSize({ width: 721, height: 900 });
  await page.goto("/");

  const narrowFirst = await links.nth(0).boundingBox();
  const narrowSecond = await links.nth(1).boundingBox();
  expect(narrowFirst).not.toBeNull();
  expect(narrowSecond).not.toBeNull();
  expect(narrowSecond!.y).toBeGreaterThanOrEqual(
    narrowFirst!.y + narrowFirst!.height
  );
  await expect(archiveNote).toBeHidden();

  await page.setViewportSize({ width: 768, height: 900 });

  const wideFirst = await links.nth(0).boundingBox();
  const wideSecond = await links.nth(1).boundingBox();
  expect(wideFirst).not.toBeNull();
  expect(wideSecond).not.toBeNull();
  expect(wideFirst!.y).toBe(wideSecond!.y);
  await expect(archiveNote).toBeVisible();
});

test("recent posts render one lead card followed by two complete rows", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto("/");

  const cards = page.locator("#recent-posts .article-card");
  const leadCards = page.locator("#recent-posts .article-card-lead");
  const regularCards = page.locator(
    "#recent-posts .article-card:not(.article-card-lead)"
  );

  await expect(cards).toHaveCount(5);
  await expect(leadCards).toHaveCount(1);
  await expect(regularCards).toHaveCount(4);
});

test("wide homepage sections consume the display width token", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 900 });
  await page.goto("/");
  await page.locator("html").evaluate(element => {
    element.style.setProperty("--layout-display-width", "80rem");
  });

  const hero = await page.locator("#hero").boundingBox();
  const recentPosts = await page.locator("#recent-posts").boundingBox();

  expect(hero).not.toBeNull();
  expect(recentPosts).not.toBeNull();
  expect(hero!.width).toBe(1280);
  expect(recentPosts!.width).toBe(1280);
});

test("lead card changes background on hover", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto("/");

  const leadLink = page.locator(
    "#recent-posts .article-card-lead > a"
  );
  const backgroundBefore = await leadLink.evaluate(
    element => getComputedStyle(element).backgroundColor
  );

  await leadLink.hover();
  await page.waitForTimeout(200);

  const backgroundAfter = await leadLink.evaluate(
    element => getComputedStyle(element).backgroundColor
  );
  expect(backgroundAfter).not.toBe(backgroundBefore);
});

test("lead card keeps its keyboard focus outline inside the viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto("/");

  const leadLink = page.locator("#recent-posts .article-card-lead > a");
  await leadLink.focus();

  const focusStyle = await leadLink.evaluate(element => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();

    return {
      left: rect.left,
      right: rect.right,
      viewportWidth: document.documentElement.clientWidth,
      outlineStyle: style.outlineStyle,
      outlineWidth: Number.parseFloat(style.outlineWidth),
      outlineOffset: Number.parseFloat(style.outlineOffset),
    };
  });

  expect(focusStyle.left).toBe(0);
  expect(focusStyle.right).toBe(focusStyle.viewportWidth);
  expect(focusStyle.outlineStyle).not.toBe("none");
  expect(focusStyle.outlineWidth).toBeGreaterThan(0);
  expect(focusStyle.outlineOffset).toBeLessThanOrEqual(
    -focusStyle.outlineWidth
  );
});
