import { test, expect } from '@playwright/test';

test('homepage', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/一颗小树/);
});

test('mobile menu closes with Escape', async ({ page }) => {
  await page.goto('/');
  const menuButton = page.locator('[data-testid="header-menu"]');
  await menuButton.click();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  await menuButton.press('Escape');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
});

test('tags page', async ({ page }) => {
  await page.goto('/tags');
  await expect(page.locator('[data-testid="tag-list"]')).toBeVisible();
  await expect(page.locator('[data-testid="tag-item"]').nth(0)).toBeVisible();
});

test('search page', async ({ page }) => {
  await page.goto('/search');
  await expect(page.locator('[data-testid="search-input"]')).toBeVisible();
});

test('about page', async ({ page }) => {
  await page.goto('/about');
  await expect(page.locator('#about')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('关于我');
});
