import { test, expect } from '@playwright/test';

test.describe('Salesforce Lead Creation', () => {

  test('Verify successful Lead creation with required fields', async ({ page }) => {

    // ---------- LOGIN ----------
    await page.goto('https://login.salesforce.com/?locale=in');
    
    await page.fill('#username', process.env.SALESFORCE_USERNAME);
    await page.fill('#password', process.env.SALESFORCE_PASSWORD);

    await page.click('#Login');

    // Verify successful login
    await page.waitForURL('**/lightning/**');
    await expect(page).toHaveURL(/lightning/);

    // ---------- NAVIGATE TO LEADS ----------
    await page.click('button[aria-label="App Launcher"]');
    await page.fill('input[placeholder="Search apps and items..."]', 'Leads');
    await page.click('one-app-launcher-menu-item >> text=Leads');

    // ---------- CREATE LEAD ----------
    await page.waitForSelector('a[title="New"]');
    await page.click('a[title="New"]');

    // Required fields
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
