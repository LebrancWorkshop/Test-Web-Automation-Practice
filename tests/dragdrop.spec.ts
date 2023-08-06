import { test, expect } from '@playwright/test';

test('Drag and Drop Auto', async({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  await page.locator('#draggable').dragTo(page.locator('#droppable'));

  await expect(page.getByText('Dropped!')).toBeVisible();
});

test('Drag and Drop Manual', async({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  await page.locator('#draggable').hover();
  await page.mouse.down();
  await page.locator('#droppable').hover();
  await page.mouse.up();

  await expect(page.getByText('Dropped!')).toBeVisible();
});

test('Drag and Drop Auto to wrong target', async({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  await page.locator('#draggable').dragTo(page.locator('#field1'));

  await expect(page.getByText('Dropped!')).toBeHidden();
});

test('Drag and Drop Manual to wrong target', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  await page.locator('#draggable').hover();
  await page.mouse.down();
  await page.locator('#field1').hover();
  await page.mouse.up();

  await expect(page.getByText('Dropped!')).toBeHidden();
});
