import { expect, test } from "@playwright/test";

test("post tags link to their archives", async ({ page }) => {
  await page.goto("/posts/newsletter-129");

  const tags = page.locator(".tags-container a");
  expect(await tags.count()).toBeGreaterThan(0);

  const href = await tags.first().getAttribute("href");
  expect(href).toMatch(/^\/tags\//);
});

test("post header exposes semantic publication metadata", async ({ page }) => {
  await page.goto("/posts/annual-summary-2025");

  const meta = page.locator(".post-meta");

  await expect(meta).toContainText("发布于");
  await expect(meta).toContainText("2025年12月31日");
});
