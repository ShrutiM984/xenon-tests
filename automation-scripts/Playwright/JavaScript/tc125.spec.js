import { test, expect } from '@playwright/test';

test.describe('Salesforce Lead Creation', () => {

  test('Verify successful Lead creation with required fields', async ({ page }) => {

    // ---------- LOGIN ----------
    await page.goto('https://login.salesforce.com/?locale=in');

    await page.fill('shruti.mamidwar680@agentforce.com', process.env.SF_USERNAME);
    await page.fill('Shrutee@2002', process.env.SF_PASSWORD);
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

    const toast = page.locator('span.toastMessage');
    await expect(toast).toContainText('Lead');

    const leadHeader = page.locator('records-record-layout-item >> text=AutomationLead');
    await expect(leadHeader).toBeVisible();
  });

});
