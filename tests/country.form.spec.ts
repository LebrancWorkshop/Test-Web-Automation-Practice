import { test, expect } from '@playwright/test';

test('Check Number of Options', async({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  await expect(page.locator('#country option')).toHaveCount(10);
  await expect(page.locator('#country option')).not.toHaveCount(11);
});

test('Select Japan and Check', async({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  await page.locator('#country').selectOption('Japan');

  await expect(page.locator('#country')).toHaveValue('japan');
  await expect(page.locator('#country')).not.toHaveValue('germany');
});
