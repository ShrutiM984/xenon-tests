import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.time.Duration;
import java.util.Scanner;

public class TC003 {

    private WebDriver driver;
    private WebDriverWait wait;
    private String loginUrl;
    private String username;
    private String password;

    @BeforeMethod
    public void setup() {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter Login URL:");
        loginUrl = scanner.nextLine();
        System.out.println("Enter Username:");
        username = scanner.nextLine();
        System.out.println("Enter Password:");
        password = scanner.nextLine();

        System.setProperty("webdriver.chrome.driver", "/usr/local/bin/chromedriver");
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        driver.manage().window().maximize();
    }

    @Test
    public void testLeadFormInteractionTC003_1735008000() {
        // Login
        driver.get(loginUrl);
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("username")));
        driver.findElement(By.id("username")).sendKeys(username);
        driver.findElement(By.id("password")).sendKeys(password);
        driver.findElement(By.id("Login")).click();
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".slds-global-header")));

        // Handle potential welcome modal/pop-up (example, adjust selector as needed)
        try {
            WebElement closeButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("button[title='Close this window']")));
            closeButton.click();
        } catch (Exception e) {
            // Ignore if the modal doesn't appear
            System.out.println("Welcome modal did not appear.");
        }

        // Navigate to Lead
        driver.get(loginUrl + "/lightning/o/Lead/home");
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".slds-page-header")));

        // Click New button
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("a[title='New']"))).click();

        // Fill in Last Name
        WebElement lastNameField = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("input[name='lastName']")));
        lastNameField.sendKeys("Test Lead Last Name");

        // Fill in Company
        WebElement companyField = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("input[name='Company']")));
        companyField.sendKeys("Test Company Name");

        // Select Lead Source
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//label[text()='Lead Source']/following::div[@class='slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click']"))).click();
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//span[@title='Web']"))).click();

        // Save
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("button[name='SaveEdit']"))).click();

        // Verify success message
        WebElement successMessage = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".slds-theme--success")));
        Assert.assertTrue(successMessage.isDisplayed(), "Success message should be displayed");

    }

    @AfterMethod
    public void teardown() {
        try {
            // Logout
            wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("button.branding-userProfile-button"))).click();
            wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("a[href*='logout']"))).click();
            wait.until(ExpectedConditions.presenceOfElementLocated(By.id("username"))); // Wait for logout to complete
        } catch (Exception e) {
            System.out.println("Logout failed or was already logged out. Continuing...");
        }
        driver.quit();
    }
}
