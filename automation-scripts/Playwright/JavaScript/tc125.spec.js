import { test, expect } from '@playwright/test';

test.describe('Salesforce Lead Creation', () => {

  test('Verify successful Lead creation with required fields', async ({ page }) => {

    // ⏱ Hard stop for entire test
    test.setTimeout(60000); // 1 minute total

    // ---------- LOGIN ----------
    await page.goto('https://login.salesforce.com/?locale=in', { timeout: 10000 });

    await page.fill('#username', process.env.SALESFORCE_USERNAME);
    await page.fill('#password', process.env.SALESFORCE_PASSWORD);
    await page.click('#Login');

    // ---------- WAIT FOR LIGHTNING (MAX 10s) ----------
    await page.waitForURL('**/lightning/**', { timeout: 10000 });

    await page.waitForSelector('one-appnav', { timeout: 10000 });

    // ---------- APP LAUNCHER ----------
    const appLauncher = page.getByRole('button', { name: 'App Launcher' });
    await appLauncher.waitFor({ state: 'visible', timeout: 10000 });
    await appLauncher.click();

    // ---------- NAVIGATE TO LEADS ----------
    const searchInput = page.getByPlaceholder('Search apps and items...');
    await searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await searchInput.fill('Leads');

    await page.getByRole('menuitem', { name: 'Leads' })
      .waitFor({ state: 'visible', timeout: 10000 });
    await page.getByRole('menuitem', { name: 'Leads' }).click();

    // ---------- CREATE LEAD ----------
    await page.getByRole('button', { name: 'New' })
      .waitFor({ state: 'visible', timeout: 10000 });
    await page.getByRole('button', { name: 'New' }).click();

    await page.fill('input[name="lastName"]', 'AutomationLead');
    await page.fill('input[name="Company"]', 'Xenon Corp');

    await page.getByRole('button', { name: 'Save' }).click();

    // ---------- VERIFY ----------
    await expect(page.locator('span.toastMessage'))
      .toContainText('Lead', { timeout: 10000 });

  });

});
