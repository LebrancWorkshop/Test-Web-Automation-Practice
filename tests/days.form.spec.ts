import { test, expect } from '@playwright/test';

test('Select Sunday and Check Sunday', async({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  await page.getByLabel('Sunday', { exact: true }).check();
  await expect(page.getByLabel('Sunday', { exact: true })).toBeChecked();
});

test('Select Sunday and Saturday and Check Both Sunday and Saturday', async({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  await page.getByLabel('Sunday', { exact: true }).check();
  await page.getByLabel('Saturday', { exact: true }).check();

  await expect(page.getByLabel('Sunday', { exact: true })).toBeChecked();
  await expect(page.getByLabel('Saturday', { exact: true })).toBeChecked();
});

test('Select Sunday, Saturday, Monday, and uncheck Saturday then check', async({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  await page.getByLabel('Sunday', { exact: true }).check();
  await page.getByLabel('Saturday', { exact: true }).check();
  await page.getByLabel('Monday', { exact: true }).check();

  await page.getByLabel('Saturday', { exact: true }).click();

  await expect(page.getByLabel('Sunday', { exact: true })).toBeChecked();
  await expect(page.getByLabel('Saturday', { exact: true })).not.toBeChecked();
  await expect(page.getByLabel('Monday', { exact: true })).toBeChecked();
  await expect(page.getByLabel('Wednesday', { exact: true })).not.toBeChecked();
});
