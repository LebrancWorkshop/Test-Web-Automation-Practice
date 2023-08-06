import { test, expect } from '@playwright/test';

test('Turn to new page and get the title of that new page', async({ context, page }) => {
  const pagePromise = context.waitForEvent('page');
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  await page.getByRole('button', { name: 'New Browser Window' }).click();

  const newPage = await pagePromise;

  await newPage.waitForLoadState('domcontentloaded');

  await expect(newPage).toHaveTitle('Your Store');
});
