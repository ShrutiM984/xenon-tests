import { test } from '@playwright/test';

test('FORCE real timeout failure on New button', async ({ page }) => {

  test.setTimeout(30000);

  await page.goto(
    'https://enterprise-app-2429.lightning.force.com/lightning/o/Lead/list?filterName=AllOpenLeads'
  );

  await page.waitForLoadState('domcontentloaded');

  // Leads tab
  const leadsTab = page.locator('a[title="Leads"]');

  await leadsTab.waitFor({
    state: 'visible',
    timeout: 30000
  });

  await leadsTab.click();

  // Correct New locator from your DOM
  const newButton = page.locator('a[title="New"]');

  // Intentionally small timeout for failure
  await newButton.waitFor({
    state: 'visible',
    timeout: 100
  });

  await newButton.click();

});
