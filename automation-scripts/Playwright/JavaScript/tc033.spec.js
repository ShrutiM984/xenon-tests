const { test } = require('@playwright/test');

test('FORCE timeout on New button', async ({ page }) => {

  await page.goto('https://enterprise-app-2429.lightning.force.com/lightning/o/Lead/list?filterName=AllOpenLeads');

  await page.locator('a[title="Leads"]').click();

  await page.waitForSelector('button[name="New"]', { timeout: 1000 });

  await page.click('button[name="New"]');
});
