const { test, expect } = require('@playwright/test');

test('Google search test', async ({ page }) => {

  // Open Google
  await page.goto('https://www.google.com');

  // Type into search box
  await page.fill('textarea[name="q"]', 'Playwright Automation');

  // Press Enter
  await page.keyboard.press('Enter');

  // Verify results page loaded
  await expect(page).toHaveURL(/search/);

  // Verify search results visible
  await expect(page.locator('h3').first()).toBeVisible();

});
