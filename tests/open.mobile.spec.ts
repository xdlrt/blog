import { test, expect } from '@playwright/test';

test('homepage', async ({ page }) => {
  await page.goto('http://localhost:4321/');
  await expect(page).toHaveTitle(/一颗小树/);
});

test('tags page', async ({ page }) => {
  await page.goto('http://localhost:4321/tags');
  await expect(page.locator('[data-testid="tag-list"]')).toBeVisible();
  await expect(page.locator('[data-testid="tag-item"]').nth(0)).toBeVisible();
});

test('search page', async ({ page }) => {
  await page.goto('http://localhost:4321/search');
  await expect(page.locator('[data-testid="search-input"]')).toBeVisible();
});

test('about page', async ({ page }) => {
  await page.goto('http://localhost:4321/about');
  await expect(page.locator('#about')).toBeVisible();
});
