package locators;

import org.openqa.selenium.By;

public class RecordedTestLocators {
    public static final By USERNAME_FIELD = By.id("user-name");
    public static final By PASSWORD_FIELD = By.id("password");
    public static final By LOGIN_BUTTON = By.id("login-button");
    public static final By PRODUCTS_PAGE_TITLE = By.cssSelector("span.title");
    public static final By BURGER_MENU_BUTTON = By.id("react-burger-menu-btn");
    public static final By LOGOUT_SIDEBAR_LINK = By.id("logout_sidebar_link");

    private RecordedTestLocators() {}
}