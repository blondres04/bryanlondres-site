import { expect, test } from '@playwright/test';

test.describe('Home', () => {
  test('renders Spanish at / with noindex', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, nofollow',
    );
  });

  test('renders English at /en', async ({ page }) => {
    await page.goto('/en');

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Sample headline');
  });

  test('serves the demo placeholder', async ({ page }) => {
    await page.goto('/demo');

    await expect(page.getByRole('heading', { level: 1, name: 'Demo' })).toBeVisible();
  });
});
