import { test, expect } from '@playwright/test';

test('Click Alert and Get Alert', async({ page } ) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  await page.getByRole('button', { name: 'Alert' }).click();

  page.on('dialog', async(dialog) => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('I am an alert box!');
    await dialog.accept();
  });

  await page.close();
});

test('Click Alert and Click Confirm', async({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  page.on('dialog', async(dialog) => {
    expect(dialog.type()).toContain('confirm');
    expect(dialog.message()).toContain('Press a button!');
    await page.waitForTimeout(1000);
    await dialog.accept();
  });

  await page.getByRole('button', { name: 'Confirm Box' }).click();

  await page.waitForTimeout(1000);
  await expect(page.locator('#demo')).toHaveText('You pressed OK!');
  await page.close();
});

test('Click Alert and Click Cancel', async({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  await page.getByRole('button', { name: 'Confirm Box' }).click();

  page.on('dialog', async(dialog) => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('Press a button!');
    await dialog.dismiss();
  });

  await page.waitForTimeout(1000);
  const resultText = await page.locator('#demo').textContent();
  expect(resultText).toContain('You pressed Cancel!');
  await page.close();
});

test('Click Alert and Input Prompt', async({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  page.on('dialog', async(dialog) => {
    expect(dialog.type()).toContain('prompt');
    expect(dialog.message()).toContain('Please enter your name:');
    await dialog.accept('Ayo');
  });

  await page.getByRole('button', { name: 'Prompt' }).click();
  const resultText = await page.locator('#demo').textContent();
  expect(resultText).toContain('Hello Ayo! How are you today?');
});

test('Click Alert and Cancel the Prompt', async({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  page.on('dialog', async(dialog) => {
    expect(dialog.type()).toContain('prompt');
    expect(dialog.message()).toContain('Please enter your name:');
    await dialog.dismiss();
  });

  await page.getByRole('button', { name: 'Prompt' }).click();
  const resultText = await page.locator('#demo').textContent();
  expect(resultText).toContain('User cancelled the prompt.');
});
