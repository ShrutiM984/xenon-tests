package pages;

import org.openqa.selenium.WebDriver;
import locators.RecordedTestLocators;

public class RecordedTestPage extends BasePage {

    public RecordedTestPage(WebDriver driver) {
        super(driver);
    }

    /**
     * Performs login action with provided credentials.
     *
     * @param username The username to enter.
     * @param password The password to enter.
     */
    public void login(String username, String password) {
        fill(RecordedTestLocators.USERNAME_FIELD, username);
        fill(RecordedTestLocators.PASSWORD_FIELD, password);
        click(RecordedTestLocators.LOGIN_BUTTON);
    }

    /**
     * Checks if the Products page title is displayed, indicating successful login.
     *
     * @return true if the Products page title is visible, false otherwise.
     */
    public boolean isProductsPageDisplayed() {
        return isElementVisible(RecordedTestLocators.PRODUCTS_PAGE_TITLE);
    }

    /**
     * Clicks the burger menu and then the logout link.
     */
    public void logout() {
        click(RecordedTestLocators.BURGER_MENU_BUTTON);
        waitForClickable(RecordedTestLocators.LOGOUT_SIDEBAR_LINK);
        click(RecordedTestLocators.LOGOUT_SIDEBAR_LINK);
    }

    /**
     * Checks if the login page is displayed by verifying the username field presence.
     *
     * @return true if the username field is visible, indicating logout was successful.
     */
    public boolean isLoginPageDisplayed() {
        return isElementVisible(RecordedTestLocators.USERNAME_FIELD);
    }
}