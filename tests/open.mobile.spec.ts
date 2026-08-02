import { test, expect } from '@playwright/test';

test('mobile menu closes with Escape', async ({ page }) => {
  await page.goto('/');
  const menuButton = page.locator('[data-testid="header-menu"]');
  await menuButton.click();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  await menuButton.press('Escape');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
});

test('mobile pagination can jump directly to a page', async ({ page }) => {
  await page.goto('/posts/8');

  const pageSelect = page.getByLabel('选择页码');
  await expect(pageSelect).toBeVisible();
  await expect(pageSelect).toHaveValue('/posts/8');
  await pageSelect.selectOption('/posts/9');
  await expect(page).toHaveURL(/\/posts\/9$/);
});
