import { test, expect } from '@playwright/test';

test('Double Click to Copy the text on the first input to the second input', async({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  const inputText = 'Good Morning!';

  await page.locator('#field1').fill(inputText);
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Copy Text' }).dblclick();

  await expect(page.locator('#field2')).toHaveValue(inputText);
});
