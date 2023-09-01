import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4321/');
});

test('light mode', async ({ page }) => {
  const theme = await page.locator('html').getAttribute('data-theme');
  await expect(theme).toBe('light');
});

test('dark mode', async ({ page }) => {
  await page.locator('#theme-btn').click();
  const theme = await page.locator('html').getAttribute('data-theme');
  await expect(theme).toBe('dark');
});
