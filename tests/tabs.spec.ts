import { test, expect } from '@playwright/test';

test('Type on Wiki Search and Get Search Result', async({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  const searchKeyword = 'ABC';
  await page.locator('.wikipedia-search-input').fill(searchKeyword);
  await page.locator('.wikipedia-search-input').press('Enter');

  await expect(page.getByText('No results found.')).toBeHidden();
});

test('Type on Wiki Search and Get no Search Result', async({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  const searchKeyword = 'iwfeiofisdjvoisdviosjdvisdjvosjd';
  await page.locator('.wikipedia-search-input').fill(searchKeyword);
  await page.locator('.wikipedia-search-input').press('Enter');

  await expect(page.getByText('No results found.')).toBeVisible();
});
