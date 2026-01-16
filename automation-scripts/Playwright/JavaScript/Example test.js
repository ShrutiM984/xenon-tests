test('Create Lead', async ({ page }) => {
  await page.goto('/lightning/page/home');

  // App Launcher
  await page.click('button[title="App Launcher"]');
  await page.click('button:has-text("View All")');
  await page.click('one-app-launcher-app-tile[data-name="Sales"]');

  // Leads
  await page.click('a[title="Leads"]');
  await page.click('a[title="New"]');

  await page.fill('//label[text()="Last Name"]/following::input[1]', 'Playwright');
  await page.fill('//label[text()="Company"]/following::input[1]', 'Automation Inc');

  await page.click('button[name="SaveEdit"]');
});
