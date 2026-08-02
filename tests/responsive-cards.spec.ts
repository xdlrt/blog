import { expect, test } from "@playwright/test";

test("homepage exposes its primary identity and navigation", async ({ page }) => {
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
  await expect(hero.getByRole("link", { name: "开始阅读" })).toHaveAttribute(
    "href",
    "/posts"
  );
  await expect(hero.getByRole("link", { name: "关于我" })).toHaveAttribute(
    "href",
    "/about"
  );
});

test("homepage exposes six recent posts and the complete archive", async ({
  page,
}) => {
  await page.goto("/");

  const cards = page.locator("#recent-posts .article-card");
  await expect(cards).toHaveCount(6);

  const hrefs = await cards.locator("a").evaluateAll(links =>
    links.map(link => link.getAttribute("href"))
  );
  expect(hrefs.every(href => href?.startsWith("/posts/"))).toBe(true);
  expect(new Set(hrefs).size).toBe(6);

  await expect(
    page.getByRole("link", { name: "查看完整写作档案", exact: true })
  ).toHaveAttribute("href", "/posts");
});
