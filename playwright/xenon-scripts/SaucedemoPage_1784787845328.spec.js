import { test, expect } from '@playwright/test';

class SaucedemoPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.logoutSidebarLink = page.locator('[data-test="logout-sidebar-link"]');
    this.reactBurgerMenuBtn = page.locator('#react-burger-menu-btn');
  }

  async navigateTo() {
    await this.page.goto('https://www.saucedemo.com/');
  }
}

test.describe('SaucedemoPage Tests', () => {
  let pageObj;

  test.beforeEach(async ({ page }) => {
    pageObj = new SaucedemoPage(page);
    await pageObj.navigateTo();
  });

  test('Verify successful login and logout functionality for a standard user', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com/
    // (Handled by beforeEach hook: await pageObj.navigateTo();)

    // 2. Click on the 'Username' input field.
    await pageObj.username.click();

    // 3. Enter 'standard_user' into the 'Username' field.
    await pageObj.username.fill('standard_user');

    // 4. Click on the 'Password' input field.
    await pageObj.password.click();

    // 5. Enter 'secret_sauce' into the 'Password' field.
    await pageObj.password.fill('secret_sauce');

    // 6. Click the 'Login' button.
    await pageObj.loginButton.click();

    // Assertion: Verify successful login by checking for the presence of the burger menu button.
    await expect(pageObj.reactBurgerMenuBtn).toBeVisible();
    await expect(page).not.toHaveURL('https://www.saucedemo.com/');

    // 7. Click the 'Burger Menu' icon located in the top-left corner.
    await pageObj.reactBurgerMenuBtn.click();

    // 8. Click the 'Logout' link from the opened sidebar menu.
    await pageObj.logoutSidebarLink.click();

    // Expected Output: The user is successfully logged out and redirected back to the login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(pageObj.username).toBeVisible(); 
    await expect(pageObj.password).toBeVisible(); 
    await expect(pageObj.loginButton).toBeVisible(); 
  });
});
