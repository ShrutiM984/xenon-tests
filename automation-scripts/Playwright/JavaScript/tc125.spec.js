const { test, expect } = require('@playwright/test');

test.describe('Salesforce Lead Creation', () => {

  test('Verify successful Lead creation with required fields', async ({ page }) => {

    // 🔹 Increase timeout
    test.setTimeout(120000);

    // 🔹 Login
    await page.goto('https://login.salesforce.com');
    await page.fill('#username', process.env.SF_USERNAME);
    await page.fill('#password', process.env.SF_PASSWORD);
    await page.click('#Login');

    // 🟡 Pause for MFA
    await page.pause();

    // 🔹 Wait for Lightning
    await page.waitForURL(url => url.includes('/lightning'), { timeout: 120000 });

    // ---------------- APP LAUNCHER ----------------

    // 🔹 Click App Launcher (9 dots)
    await page.waitForSelector(
      'button[title="App Launcher"]',
      { timeout: 60000 }
    );
    await page.click('button[title="App Launcher"]');

    // 🔹 Click "View All"
    await page.waitForSelector('button:has-text("View All")');
    await page.click('button:has-text("View All")');

    // 🔹 Select Sales app
    await page.waitForSelector('p:has-text("Sales")');
    await page.click('p:has-text("Sales")');

    // ---------------- LEADS ----------------

    // 🔹 Click Leads tab
    await page.waitForSelector('a[title="Leads"]', { timeout: 60000 });
    await page.click('a[title="Leads"]');

    // 🔹 New Lead
    await page.waitForSelector('a[title="New"]');
    await page.click('a[title="New"]');

    // 🔹 Fill Lead form
    await page.fill(
      '//label[text()="Last Name"]/following::input[1]',
      'PlaywrightLead'
    );
    await page.fill(
      '//label[text()="Company"]/following::input[1]',
      'Playwright Inc'
    );

    // 🔹 Save
    await page.click('button[name="SaveEdit"]');

    // ✅ Verify toast
    const toast = page.locator('span.toastMessage');
    await expect(toast).toContainText('Lead');
  });

});
