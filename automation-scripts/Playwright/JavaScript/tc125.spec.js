const { test, expect } = require('@playwright/test');

test.describe('Salesforce Lead Creation', () => {

  test('Verify successful Lead creation with required fields', async ({ page }) => {

    // 🔹 Increase timeout (important for Salesforce)
    test.setTimeout(120000); // 2 minutes

    // 🔹 Open Salesforce login
    await page.goto('https://orgfarm-dc0c924067-dev-ed.develop.my.salesforce.com');
    
    await page.fill('#username', process.env.SALESFORCE_USERNAME);
    await page.fill('#password', process.env.SALESFORCE_PASSWORD);
    await page.click('#Login');


    // 🟡 PAUSE HERE FOR MFA
    // Playwright Inspector opens → Enter OTP manually → Click Resume ▶️
    await page.pause();

    // 🔹 Wait until Salesforce home page loads
    await page.waitForURL(
      url => url.includes('lightning'),
      { timeout: 120000 }
    );

    // ✅ Assertion: Home page loaded
    await expect(page).toHaveURL(/lightning/);

    // 🔹 Continue with Lead creation steps
    await page.click('a[title="Leads"]');
    await page.click('a[title="New"]');

    await page.fill('input[name="LastName"]', 'PlaywrightLead');
    await page.fill('input[name="Company"]', 'Playwright Inc');

    await page.click('button[name="SaveEdit"]');

    // ✅ Verify success toast
    const toast = page.locator('span.toastMessage');
    await expect(toast).toContainText('Lead');
  });

});
