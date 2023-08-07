import { test, expect } from '@playwright/test';

test('Count Colors to be 5 not to be 6', async({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  await expect(page.locator('#colors option')).toHaveCount(5);
  await expect(page.locator('#colors option')).not.toHaveCount(6);
});

// test('Select Red and Green and Check', async({ page }) => {
//   await page.goto('/');
//   await page.waitForLoadState('domcontentloaded');

//   await page.locator('#colors').selectOption(['Red', 'Green']);
//   await expect(page.locator('option[value="red"]')).toBeChecked();
//   await expect(page.locator('option[value="green"]')).toBeChecked();
//   await expect(page.locator('option[value="blue"]')).not.toBeChecked();
// });
