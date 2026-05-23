const { test } = require('@playwright/test');

test('FORCE real timeout failure on New button', async ({ page }) => {

  test.setTimeout(30000);

  await page.goto(
    'https://enterprise-app-2429.lightning.force.com/lightning/o/Lead/list?filterName=AllOpenLeads'
  );

  await page.waitForSelector('button[name="New"]', {
    timeout: 100
  });

  await page.click('button[name="New"]');

});
