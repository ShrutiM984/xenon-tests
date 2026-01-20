package test;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import java.time.Duration;

/**
 * Selenium Java Test for Salesforce Lead Creation
 * Test Case: TC125 - Verify successful Lead creation with required fields
 */
public class TC127 {
    
    private WebDriver driver;
    private WebDriverWait wait;
    
    @BeforeMethod
    public void setUp() {
        // Configure Chrome options
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--window-size=1920,1080");
        
        // For headless mode, uncomment:
        // options.addArguments("--headless=new");
        
        // Initialize WebDriver
        driver = new ChromeDriver(options);
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(120));
        
        wait = new WebDriverWait(driver, Duration.ofSeconds(60));
    }
    
    @Test
    public void testLeadCreation() {
        /**
         * Verify successful Lead creation with required fields in Salesforce
         * Note: For Selenium, you may need to handle authentication separately
         * or use cookies from storageState.json if available
         */
        
        // ✅ Start directly on Lightning - session should be authenticated
        driver.get("https://orgfarm-5694adb5bf-dev-ed.develop.lightning.force.com/lightning/page/home");
        
        // Wait for page to load
        wait.until(ExpectedConditions.presenceOfElementLocated(By.tagName("body")));

        // ---------------- APP LAUNCHER ----------------
        WebElement appLauncher = wait.until(
            ExpectedConditions.elementToBeClickable(By.cssSelector("button[title=\"App Launcher\"]"))
        );
        appLauncher.click();
        
        // Click View All
        WebElement viewAll = wait.until(
            ExpectedConditions.elementToBeClickable(By.xpath("//button[text()=\"View All\"]"))
        );
        viewAll.click();
        
        // Click Sales app
        WebElement salesApp = wait.until(
            ExpectedConditions.elementToBeClickable(By.cssSelector("one-app-launcher-app-tile[data-name=\"Sales\"]"))
        );
        salesApp.click();

        // ---------------- LEADS ----------------
        // Click Leads tab
        WebElement leadsTab = wait.until(
            ExpectedConditions.elementToBeClickable(By.cssSelector("a[title=\"Leads\"]"))
        );
        leadsTab.click();

      By newBtn = By.cssSelector("button[name='New']");
        
        WebElement newButton = wait.until(
            ExpectedConditions.elementToBeClickable(newBtn)
        );
        
        ((JavascriptExecutor) driver).executeScript(
            "arguments[0].click();", newButton
        );


        // Fill Lead form
        WebElement lastNameInput = wait.until(
            ExpectedConditions.presenceOfElementLocated(By.xpath("//label[text()=\"Last Name\"]/following::input[1]"))
        );
        lastNameInput.clear();
        lastNameInput.sendKeys("SeleniumJavaLead");
        
        WebElement companyInput = wait.until(
            ExpectedConditions.presenceOfElementLocated(By.xpath("//label[text()=\"Company\"]/following::input[1]"))
        );
        companyInput.clear();
        companyInput.sendKeys("Selenium Java Inc");

        // Save
        WebElement saveButton = wait.until(
            ExpectedConditions.elementToBeClickable(By.cssSelector("button[name=\"SaveEdit\"]"))
        );
        saveButton.click();

        // ✅ Verify toast message
        WebElement toast = wait.until(
            ExpectedConditions.presenceOfElementLocated(By.cssSelector("span.toastMessage"))
        );
        
        String toastText = toast.getText();
        assert toastText.contains("Lead") : "Expected 'Lead' in toast message, but got: " + toastText;
    }
    
    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
