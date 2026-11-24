import { expect, test } from '@playwright/test';

test.describe('I18n', () => {
  test('switches from Spanish to English with the language links', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');

    await page.getByRole('navigation', { name: 'Cambiar idioma' }).getByText('EN').click();

    await expect(page).toHaveURL(/\/en$/u);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });
});
