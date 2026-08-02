import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4321/');
});

test('theme toggle switches from light to dark', async ({ page }) => {
  const theme = await page.locator('html').getAttribute('data-theme');
  await expect(theme).toBe('light');
  await page.locator('#theme-btn').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});
