import { test, expect } from '@playwright/test';

test.describe('Salesforce Lead Creation', () => {

  test('Verify successful Lead creation with required fields', async ({ page }) => {

    // ⏱ Increase full test timeout (MFA takes time)
    test.setTimeout(5 * 60 * 1000); // 5 minutes

    // ---------- LOGIN ----------
    await page.goto('https://login.salesforce.com/?locale=in');

    await page.fill('#username', process.env.SALESFORCE_USERNAME);
    await page.fill('#password', process.env.SALESFORCE_PASSWORD);
    await page.click('#Login');

    // ---------- MANUAL MFA STEP ----------
    console.log('⏸ Waiting for manual verification code entry...');
    console.log('👉 Please enter Salesforce verification code in browser');

    // Wait until Lightning URL appears AFTER MFA
    await page.waitForURL('**/lightning/**', { timeout: 4 * 60 * 1000 });

    // Wait for Lightning shell to fully load
    await page.waitForSelector('one-appnav', { timeout: 120000 });

    // Extra buffer for Salesforce UI hydration
    await page.waitForTimeout(10000);

    // ---------- OPEN APP LAUNCHER ----------
    const appLauncher = page.getByRole('button', { name: 'App Launcher' });
    await appLauncher.waitFor({ state: 'visible', timeout: 60000 });
    await appLauncher.click();

    // ---------- NAVIGATE TO LEADS ----------
    const searchInput = page.getByPlaceholder('Search apps and items...');
    await searchInput.waitFor({ state: 'visible' });
    await searchInput.fill('Leads');

    await page.getByRole('menuitem', { name: 'Leads' }).click();

    // ---------- CREATE LEAD ----------
    await page.waitForSelector('a[title="New"]', { timeout: 60000 });
    await page.click('a[title="New"]');

    await page.fill('input[name="lastName"]', 'AutomationLead');
    await page.fill('input[name="Company"]', 'Xenon Corp');

    await page.click('button[name="SaveEdit"]');

    // ---------- VERIFICATION ----------
    const toast = page.locator('span.toastMessage');
    await expect(toast).toContainText('Lead');

    await expect(
      page.locator('records-record-layout-item', { hasText: 'AutomationLead' })
    ).toBeVisible();
  });

});
