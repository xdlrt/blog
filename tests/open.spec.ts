import { test, expect } from '@playwright/test';

test('homepage', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/一颗小树/);
});

test('tags page', async ({ page }) => {
  await page.goto('/tags');
  await expect(page.locator('[data-testid="tag-list"]')).toBeVisible();
  await expect(page.locator('[data-testid="tag-item"]').nth(0)).toBeVisible();
});

test('search page', async ({ page }) => {
  await page.goto('/search');
  const searchIsland = page.locator(
    'astro-island[component-url*="Search.tsx"]'
  );
  const input = page.locator('[data-testid="search-input"]');

  await expect(searchIsland).not.toHaveAttribute('ssr', '', {
    timeout: 15_000,
  });
  await expect(input).toBeVisible();
  await input.fill('树');
  await expect(page).toHaveURL(/\/search\?q=%E6%A0%91$/);
  await expect(page.locator('main [aria-live="polite"]')).toContainText(
    '有关「树」'
  );
  expect(await page.locator('.article-card').count()).toBeGreaterThan(0);
});

test('long tag archives progressively reveal posts', async ({ page }) => {
  await page.goto('/tags/newsletter');
  await expect(page.locator('.article-card:not(.hidden)')).toHaveCount(24);
  await page.getByRole('button', { name: '再看 24 篇' }).click();
  await expect(page.locator('.article-card:not(.hidden)')).toHaveCount(48);
});

test('desktop pagination exposes common archive navigation', async ({ page }) => {
  await page.goto('/posts/8');

  const pagination = page.getByRole('navigation', { name: '文章分页' });
  await expect(pagination).toBeVisible();
  await expect(
    pagination.getByRole('link', { name: '前往第 1 页' })
  ).toBeVisible();
  await expect(
    pagination.getByRole('link', { name: '前往第 20 页' })
  ).toBeVisible();
  await expect(
    pagination.getByRole('link', { name: '前往第 8 页' })
  ).toHaveAttribute('aria-current', 'page');
  await expect(pagination.getByText(/共 \d+ 篇/)).toBeVisible();
  await expect(
    pagination.getByRole('link', { name: '前往上一页，第 7 页' })
  ).toHaveAttribute('rel', 'prev');
  await expect(
    pagination.getByRole('link', { name: '前往下一页，第 9 页' })
  ).toHaveAttribute('rel', 'next');
});

test('footer closes the page with text navigation', async ({ page }) => {
  await page.goto('/about');

  const footer = page.locator('footer');
  await expect(footer.getByText('写作是持续整理自己的方式。')).toBeVisible();
  await expect(footer.getByRole('link', { name: '回到顶部' })).toBeVisible();
  await expect(footer.getByRole('link', { name: 'Github' })).toBeVisible();
});
