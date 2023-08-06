import { test, expect } from '@playwright/test';

test('Type on Wiki Search and Get Search Result', async({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  const searchKeyword = 'ABC';
  await page.locator('.wikipedia-search-input').fill(searchKeyword);
  await page.locator('.wikipedia-search-input').press('Enter');

  await expect(page.getByText('No results found.')).toBeHidden();
  await page.close();
});

test('Type on Wiki Search and Get no Search Result', async({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  const searchKeyword = 'iwfeiofisdjvoisdviosjdvisdjvosjd';
  await page.locator('.wikipedia-search-input').fill(searchKeyword);
  await page.locator('.wikipedia-search-input').press('Enter');

  await expect(page.getByText('No results found.')).toBeVisible();
  await page.close();
});

test('Type on wiki search and click the result to the new page', async({ context, page }) => {
  const pagePromise = context.waitForEvent('page');

  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  const searchKeyword = 'A';
  await page.locator('.wikipedia-search-input').fill(searchKeyword);
  await page.locator('.wikipedia-search-input').press('Enter');

  await page.waitForSelector('.wikipedia-search-results');

  await page.locator('.wikipedia-search-results #wikipedia-search-result-link:first-child a').click()

  const newPage = await pagePromise;

  const wikipedia = (await newPage.title()).split(' - ')[1];

  await expect(wikipedia).toBe('Wikipedia');
  await page.close();
});
