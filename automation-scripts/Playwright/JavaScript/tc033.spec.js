const { test } = require('@playwright/test');

test('FORCE timeout on New button', async ({ page }) => {

  await page.goto('https://login.salesforce.com');

  await page.locator('a[title="Leads"]').click();

  await page.waitForSelector('button[name="New"]', { timeout: 2000 });

  await page.click('button[name="New"]');
});
