import { test, expect } from '@playwright/test';

test('Gender form check male', async({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  await page.getByLabel('Male', { exact: true }).check();
  await expect(page.getByLabel('Male', { exact: true })).toBeChecked();
});

test('Gender form check female', async({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  await page.getByLabel('Female', { exact: true }).check();
  await expect(page.getByLabel('Female', { exact: true })).toBeChecked();
});

test('Gender form check male and then female so male turn to not checked', async({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  await page.getByLabel('Male', { exact: true }).check();
  await page.getByLabel('Female', { exact: true }).check();

  await expect(page.getByLabel('Female', { exact: true })).toBeChecked();
  await expect(page.getByLabel('Male', { exact: true })).not.toBeChecked();
});
