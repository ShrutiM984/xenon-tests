package pages;

import org.openqa.selenium.WebDriver;
import locators.RecordedTestLocators;

public class RecordedTestPage extends BasePage {

    public RecordedTestPage(WebDriver driver) {
        super(driver);
    }

    /**
     * Performs a user login with the given credentials.
     *
     * @param username The username to enter.
     * @param password The password to enter.
     */
    public void login(String username, String password) {
        waitForElement(RecordedTestLocators.USERNAME_INPUT);
        fill(RecordedTestLocators.USERNAME_INPUT, username);
        fill(RecordedTestLocators.PASSWORD_INPUT, password);
        click(RecordedTestLocators.LOGIN_BUTTON);
    }

    /**
     * Clicks the burger menu icon.
     */
    public void clickBurgerMenu() {
        click(RecordedTestLocators.BURGER_MENU_BUTTON);
    }

    /**
     * Clicks the logout link in the sidebar menu.
     */
    public void clickLogout() {
        waitForClickable(RecordedTestLocators.LOGOUT_SIDEBAR_LINK);
        click(RecordedTestLocators.LOGOUT_SIDEBAR_LINK);
    }

    /**
     * Checks if the Products page is currently displayed by verifying the page title.
     *
     * @return true if the Products page title is visible and contains "Products", false otherwise.
     */
    public boolean isProductsPageDisplayed() {
        waitForElement(RecordedTestLocators.PRODUCTS_PAGE_TITLE);
        return getText(RecordedTestLocators.PRODUCTS_PAGE_TITLE).equals("Products");
    }

    /**
     * Checks if the Login page is currently displayed by verifying the username input field is visible.
     *
     * @return true if the username input field is visible, false otherwise.
     */
    public boolean isLoginPageDisplayed() {
        return isElementVisible(RecordedTestLocators.USERNAME_INPUT);
    }
}