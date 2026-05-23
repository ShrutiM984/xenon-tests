await page.goto(
  'https://enterprise-app-2429.lightning.force.com/lightning/o/Account/list?filterName=AllAccounts'
);

await page.waitForLoadState('domcontentloaded');

// Click Accounts tab
const accountsTab = page.getByRole('link', { name: 'Accounts' });

await accountsTab.waitFor({
  state: 'visible',
  timeout: 30000
});

await accountsTab.click();

// Click New button
const newButton = page.locator(
  'li[data-target-selection-name="sfdc:StandardButton.Account.New"] a'
);

await newButton.waitFor({
  state: 'visible',
  timeout: 30000
});

await newButton.click();
