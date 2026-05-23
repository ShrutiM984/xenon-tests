import { test, expect } from '@playwright/test';

test('Verify successful Account creation', async ({ page }) => {

  test.setTimeout(120000);

  // Open Salesforce Accounts page
  await page.goto(
    'https://enterprise-app-2429.lightning.force.com/lightning/o/Account/list?filterName=AllAccounts'
  );

  await page.waitForLoadState('domcontentloaded');

  // ---------------- ACCOUNTS TAB ----------------
  // Using exact title selector to avoid strict mode issue
  const accountsTab = page.locator('a[title="Accounts"]');

  await accountsTab.waitFor({
    state: 'visible',
    timeout: 30000
  });

  await accountsTab.click();

  // ---------------- NEW BUTTON ----------------
  const newButton = page.locator('a[title="New"]');

  await newButton.waitFor({
    state: 'visible',
    timeout: 30000
  });

  await newButton.click();

  // ---------------- ACCOUNT FORM ----------------
  const accountName = `Playwright Account ${Date.now()}`;

  await page.locator('input[name="Name"]').fill(accountName);

  // Save
  await page.locator('button[name="SaveEdit"]').click();

  // ---------------- VERIFICATION ----------------
  const toastMessage = page.locator('span.toastMessage');

  await expect(toastMessage).toContainText('Account');

});
