import { test, expect } from '@playwright/test';

test('The second book name is Learn Java', async({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  const rows = await page.$$('table[name="BookTable"] tbody tr');
  const secondRow = rows[2];
  const secondRowFirstColumn = await secondRow.$$('td');
  const result = await secondRowFirstColumn[0].textContent();

  await expect(result).toBe('Learn Java');

  await page.close();
});

test('The Book name Master In Selenium is $3000', async({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  const rows = await page.$$('table[name="BookTable"] tbody tr');

  let targetIndex = 0;

  for(let i = 1; i < rows.length; i++) {
    const columns = await rows[i].$$('td');
    const bookName = await columns[0].textContent();

    if(bookName === 'Master In Selenium') {
      targetIndex = i;
      break;
    }
  }

  const targetRow = rows[targetIndex];
  const targetRowColumns = await targetRow.$$('td');

  const result = await targetRowColumns[3].textContent();
  const price = Number(result);

  expect(price).toBe(3000);

  await page.close();
});
