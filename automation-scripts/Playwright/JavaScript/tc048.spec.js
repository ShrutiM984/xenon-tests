import { test } from '@playwright/test';

test('FORCE real timeout failure on New button', async ({ page }) => {

  test.setTimeout(30000);

  await page.goto(
    'https://enterprise-app-2429.lightning.force.com/lightning/o/Lead/list?filterName=AllOpenLeads'
  );

  await page.waitForLoadState('domcontentloaded');

  // Click Leads tab
  const leadsTab = page.locator('a[title="Leads"]');

  await leadsTab.waitFor({
    state: 'visible',
    timeout: 30000
  });

  await leadsTab.click();

  // Correct Salesforce New locator
  const newButton = page.locator(
    'li[data-target-selection-name="sfdc:StandardButton.Lead.New"] a'
  );

  // Intentionally very small timeout to force failure
  await newButton.waitFor({
    state: 'visible',
    timeout: 100
  });

  await newButton.click();

});
