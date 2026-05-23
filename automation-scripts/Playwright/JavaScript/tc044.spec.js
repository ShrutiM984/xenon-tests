const { test, expect } = require('@playwright/test');

test.describe('Salesforce Lead Creation', () => {

  test('Verify successful Lead creation', async ({ page }) => {

    test.setTimeout(120000);

    await page.goto(
      'https://enterprise-app-2429.lightning.force.com/lightning/o/Lead/list?filterName=AllOpenLeads'
    );

    await page.waitForLoadState('domcontentloaded');

   await page.waitForSelector('button[name="New"]', {
      timeout: 15000
    });

    await page.click('button[name="New"]');

    const lastName = `Lead_${Date.now()}`;

    await page.fill('input[name="lastName"]', lastName);

    await page.fill('input[name="Company"]', 'Xenon AI');

    await page.click('button[name="SaveEdit"]');

    const toast = page.locator('span.toastMessage');

    await expect(toast).toContainText('Lead');

  });

});
