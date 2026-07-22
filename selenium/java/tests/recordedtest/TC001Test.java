package tests.recordedtest;

import org.testng.Assert;
import org.testng.annotations.Test;
import pages.RecordedTestPage;
import tests.BaseTest;

public class TC001Test extends BaseTest {

    @Test(description = "TC001 - Standard user login, products page navigation, and logout")
    public void testStandardUserLoginAndLogout() {
        RecordedTestPage recordedTestPage = new RecordedTestPage(driver);

        // 1. Navigate to the SauceDemo website
        driver.get("https://www.saucedemo.com/");

        // 2. Enter 'standard_user' into the Username field.
        // 3. Enter 'secret_sauce' into the Password field.
        // 4. Click the 'Login' button.
        recordedTestPage.login("standard_user", "secret_sauce");

        // Verification: Ensure products page is displayed after login
        Assert.assertTrue(recordedTestPage.isProductsPageDisplayed(), "Products page should be displayed after successful login.");

        // 5. Click the 'Burger menu' icon (top left corner).
        // 6. Click the 'Logout' link in the sidebar menu.
        recordedTestPage.logout();

        // Verification: Ensure logout was successful and user is back on login page
        Assert.assertTrue(recordedTestPage.isLoginPageDisplayed(), "Login page should be displayed after successful logout.");
    }
}