import { test, expect } from '@playwright/test';

test('homepage', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/一颗小树/);
  await expect(page.locator('html')).toHaveJSProperty('scrollWidth', await page.locator('html').evaluate(el => el.clientWidth));
});

test('tags page', async ({ page }) => {
  await page.goto('/tags');
  await expect(page.locator('[data-testid="tag-list"]')).toBeVisible();
  await expect(page.locator('[data-testid="tag-item"]').nth(0)).toBeVisible();
});

test('search page', async ({ page }) => {
  await page.goto('/search');
  const input = page.locator('[data-testid="search-input"]');
  await expect(input).toBeVisible();
  await input.fill('树');
  await expect(page.getByText(/按相关度找到 \d+ 篇/)).toBeVisible();
  await expect(page.locator('.article-card')).toHaveCount(20);
});

test('about page', async ({ page }) => {
  await page.goto('/about');
  await expect(page.locator('#about')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('关于我');
});

test('long tag archives progressively reveal posts', async ({ page }) => {
  await page.goto('/tags/newsletter');
  await expect(page.locator('.article-card:not(.hidden)')).toHaveCount(24);
  await page.getByRole('button', { name: '再看 24 篇' }).click();
  await expect(page.locator('.article-card:not(.hidden)')).toHaveCount(48);
});
