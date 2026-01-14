import { test, expect } from '@playwright/test';

test.describe('Salesforce Lead Creation', () => {

  test('Verify successful Lead creation with required fields', async ({ page }) => {

    test.setTimeout(60000); // hard stop

    // ---------- LOGIN ----------
    await page.goto('https://login.salesforce.com/?locale=in', { timeout: 10000 });

    await page.fill('#username', process.env.SALESFORCE_USERNAME);
    await page.fill('#password', process.env.SALESFORCE_PASSWORD);
    await page.click('#Login');

    // ---------- WAIT MAX 10s FOR POST-LOGIN RESULT ----------
    try {
      await page.waitForURL('**/lightning/**', { timeout: 10000 });
    } catch (e) {
      const currentUrl = page.url();

      // 🚨 MFA detected
      if (
        currentUrl.includes('verification') ||
        currentUrl.includes('challenge') ||
        currentUrl.includes('identity')
      ) {
        throw new Error(
          'Login blocked by Salesforce MFA. ' +
          'Manual verification is not supported with 10s timeout / CI execution.'
        );
      }

      throw new Error(`Login failed or Salesforce too slow. Current URL: ${currentUrl}`);
    }

    // ---------- LIGHTNING READY ----------
    await page.waitForSelector('one-appnav', { timeout: 10000 });

    // ---------- APP LAUNCHER ----------
    await page.getByRole('button', { name: 'App Launcher' })
      .click({ timeout: 10000 });

    // ---------- NAVIGATE TO LEADS ----------
    const searchInput = page.getByPlaceholder('Search apps and items...');
    await searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await searchInput.fill('Leads');

    await page.getByRole('menuitem', { name: 'Leads' })
      .click({ timeout: 10000 });

    // ---------- CREATE LEAD ----------
    await page.getByRole('button', { name: 'New' })
      .click({ timeout: 10000 });

    await page.fill('input[name="lastName"]', 'AutomationLead');
    await page.fill('input[name="Company"]', 'Xenon Corp');

    await page.getByRole('button', { name: 'Save' })
      .click({ timeout: 10000 });

    // ---------- VERIFY ----------
    await expect(page.locator('span.toastMessage'))
      .toContainText('Lead', { timeout: 10000 });

  });

});
