import { test, expect } from '@playwright/test';

test('Slide to the rightest manual', async({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  await page.locator('.ui-slider-handle').hover();
  await page.mouse.down();
  await page.mouse.move(10000, 0);
  await page.mouse.up();

  expect(await page.locator('.ui-slider-handle').getAttribute('style')).toBe('left: 100%;');
  await page.close();
});
