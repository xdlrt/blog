import { expect, test } from "@playwright/test";

test("homepage hero keeps only the primary identity information", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto("/");

  const hero = page.locator("#hero");

  await expect(
    hero.getByText("IN PROGRESS TO BE A PRODUCT MAKER", { exact: true })
  ).toBeVisible();
  await expect(hero.getByRole("heading", { level: 1 })).toContainText(
    "技术向前，生活向内。"
  );
  await expect(hero.getByText("篇文章", { exact: true })).toBeVisible();
  await expect(hero.getByText("始于 2016", { exact: true })).toBeVisible();
  await expect(hero.getByText("持续更新", { exact: true })).toBeVisible();
  await expect(hero.getByRole("link", { name: "开始阅读" })).toBeVisible();
  await expect(hero.getByRole("link", { name: "关于我" })).toBeVisible();
  await expect(hero.getByRole("link", { name: "Github" })).toBeVisible();
  await expect(hero.getByRole("link", { name: "X", exact: true })).toBeVisible();
  await expect(hero.getByRole("link", { name: "Email" })).toBeVisible();
  await expect(hero.getByRole("link", { name: "RSS" })).toBeVisible();

  await expect(hero.locator(".hero-intro, .note-label, .note-copy")).toHaveCount(
    0
  );
  await expect(hero.getByText("EST. 2016", { exact: true })).toHaveCount(0);
  await expect(hero.getByText("FIND ME ELSEWHERE", { exact: true })).toHaveCount(
    0
  );
  await expect(hero.locator("svg")).toHaveCount(0);
});

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

  test(`left-column post titles keep the section's axis at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    const heading = await page
      .locator("#recent-posts .section-heading h2")
      .boundingBox();
    const titles = page.locator("#recent-posts .article-card .card-title");
    const firstTitle = await titles.nth(0).boundingBox();
    const thirdTitle = await titles.nth(2).boundingBox();

    expect(heading).not.toBeNull();
    expect(firstTitle).not.toBeNull();
    expect(thirdTitle).not.toBeNull();
    expect(Math.abs(firstTitle!.x - heading!.x)).toBeLessThanOrEqual(0.5);
    expect(Math.abs(thirdTitle!.x - heading!.x)).toBeLessThanOrEqual(0.5);
  });
}

test("homepage cards switch columns while the hero summary stays visible", async ({
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
  await expect(archiveNote).toBeVisible();

  await page.setViewportSize({ width: 768, height: 900 });

  const wideFirst = await links.nth(0).boundingBox();
  const wideSecond = await links.nth(1).boundingBox();
  expect(wideFirst).not.toBeNull();
  expect(wideSecond).not.toBeNull();
  expect(wideFirst!.y).toBe(wideSecond!.y);
  await expect(archiveNote).toBeVisible();
});

test("homepage hero follows the intended responsive reading order", async ({
  page,
}) => {
  const mobileWidths = [390, 721];

  for (const width of mobileWidths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    const heading = await page.locator(".hero-heading").boundingBox();
    const archive = await page.locator(".archive-note").boundingBox();
    const actions = await page.locator(".hero-actions").boundingBox();
    const social = await page.locator(".social-wrapper").boundingBox();

    expect(heading).not.toBeNull();
    expect(archive).not.toBeNull();
    expect(actions).not.toBeNull();
    expect(social).not.toBeNull();
    expect(archive!.y).toBeGreaterThanOrEqual(heading!.y + heading!.height);
    expect(actions!.y).toBeGreaterThanOrEqual(archive!.y + archive!.height);
    expect(social!.y).toBeGreaterThanOrEqual(actions!.y + actions!.height);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth)
    ).toBeLessThanOrEqual(width);
  }

  for (const width of [768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    const heading = await page.locator(".hero-heading").boundingBox();
    const archive = await page.locator(".archive-note").boundingBox();
    const actions = await page.locator(".hero-actions").boundingBox();
    const social = await page.locator(".social-wrapper").boundingBox();

    expect(heading).not.toBeNull();
    expect(archive).not.toBeNull();
    expect(actions).not.toBeNull();
    expect(social).not.toBeNull();
    expect(archive!.x).toBeGreaterThan(heading!.x + heading!.width);
    expect(Math.abs(actions!.y - social!.y)).toBeLessThanOrEqual(1);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth)
    ).toBeLessThanOrEqual(width);
  }
});

test("homepage writing summary uses one visible left axis", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto("/");

  const textStarts = await page.locator("#hero").evaluate(hero => {
    const textStart = (selector: string) => {
      const element = hero.querySelector(selector);
      const textNode = element?.firstChild;

      if (!textNode) return null;

      const range = document.createRange();
      range.selectNodeContents(textNode);
      return range.getBoundingClientRect().x;
    };

    return {
      count: textStart(".note-count strong"),
      status: textStart(".note-meta span"),
      social: textStart(".social-wrapper a"),
    };
  });

  expect(textStarts.count).not.toBeNull();
  expect(textStarts.status).not.toBeNull();
  expect(textStarts.social).not.toBeNull();
  expect(Math.abs(textStarts.status! - textStarts.count!)).toBeLessThanOrEqual(
    0.5
  );
  expect(Math.abs(textStarts.social! - textStarts.count!)).toBeLessThanOrEqual(
    0.5
  );
});

test("recent posts render six equally weighted cards in three rows", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto("/");

  const cards = page.locator("#recent-posts .article-card");
  const leadCards = page.locator("#recent-posts .article-card-lead");
  const regularCards = page.locator(
    "#recent-posts .article-card:not(.article-card-lead)"
  );

  await expect(cards).toHaveCount(6);
  await expect(leadCards).toHaveCount(0);
  await expect(regularCards).toHaveCount(6);
});

test("complete writing archive is a prominent text-only action", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto("/");

  const action = page.getByRole("link", {
    name: "查看完整写作档案",
    exact: true,
  });
  const presentation = await action.evaluate(element => {
    const styles = getComputedStyle(element);
    const rect = element.getBoundingClientRect();

    return {
      height: rect.height,
      backgroundColor: styles.backgroundColor,
    };
  });

  await expect(action).toBeVisible();
  await expect(action.locator("svg")).toHaveCount(0);
  expect(presentation.height).toBeGreaterThanOrEqual(44);
  expect(presentation.backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
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

test("editorial card changes background on hover", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto("/");

  const editorialLink = page.locator("#recent-posts .article-card > a").first();
  const backgroundBefore = await editorialLink.evaluate(
    element => getComputedStyle(element).backgroundColor
  );

  await editorialLink.hover();
  await page.waitForTimeout(200);

  const backgroundAfter = await editorialLink.evaluate(
    element => getComputedStyle(element).backgroundColor
  );
  expect(backgroundAfter).not.toBe(backgroundBefore);
});

test("editorial card keeps its keyboard focus outline inside the viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto("/");

  const editorialLink = page
    .locator("#recent-posts .article-card > a")
    .first();
  await editorialLink.focus();

  const focusStyle = await editorialLink.evaluate(element => {
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

  expect(focusStyle.left).toBeGreaterThanOrEqual(0);
  expect(focusStyle.right).toBeLessThanOrEqual(focusStyle.viewportWidth);
  expect(focusStyle.outlineStyle).not.toBe("none");
  expect(focusStyle.outlineWidth).toBeGreaterThan(0);
  const outlineReach = Math.max(
    0,
    focusStyle.outlineWidth + focusStyle.outlineOffset
  );
  expect(focusStyle.left - outlineReach).toBeGreaterThanOrEqual(0);
  expect(focusStyle.right + outlineReach).toBeLessThanOrEqual(
    focusStyle.viewportWidth
  );
});
