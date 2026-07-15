package tests.recordedtest;

import org.testng.Assert;
import org.testng.annotations.Test;
import pages.RecordedTestPage;
import tests.BaseTest;

public class TC001Test extends BaseTest {

    @Test(description = "TC001 - Standard user login, products page navigation, and logout")
    public void testStandardUserLoginProductsNavigationAndLogout() {
        RecordedTestPage recordedTestPage = new RecordedTestPage(driver);

        // Step 1: Navigate to the SauceDemo website (handled by BaseTest setup)
        // Step 2-4: Perform login
        recordedTestPage.login("standard_user", "secret_sauce");

        // Verification: Ensure products page is displayed after login
        Assert.assertTrue(recordedTestPage.isProductsPageDisplayed(), "Products page should be displayed after successful login.");

        // Step 5: Click the 'Burger menu' icon
        recordedTestPage.clickBurgerMenu();

        // Step 6: Click the 'Logout' link
        recordedTestPage.clickLogout();

        // Verification: Ensure login page is displayed after logout
        Assert.assertTrue(recordedTestPage.isLoginPageDisplayed(), "Login page should be displayed after successful logout.");
    }
}