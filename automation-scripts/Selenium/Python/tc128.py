"""
Selenium Python Test for Salesforce Lead Creation
Test Case: TC125 - Verify successful Lead creation with required fields
"""
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options as ChromeOptions


@pytest.fixture(scope="function")
def driver():
    """
    Create and configure WebDriver instance
    Note: storageState.json is handled by the system for Playwright tests.
    For Selenium, you may need to handle authentication differently.
    """
    options = ChromeOptions()
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--window-size=1920,1080')
    
    # For headless mode, uncomment:
    # options.add_argument('--headless=new')
    
    driver = webdriver.Chrome(options=options)
    driver.implicitly_wait(10)
    driver.set_page_load_timeout(120)
    
    yield driver
    
    driver.quit()


def test_lead_creation(driver):
    """
    Verify successful Lead creation with required fields in Salesforce
    """
    wait = WebDriverWait(driver, 60)
    
    # ✅ Start directly on Lightning - session should be authenticated
    # Note: For Selenium, you may need to handle authentication separately
    # or use cookies from storageState.json if available
    driver.get('https://orgfarm-5694adb5bf-dev-ed.develop.lightning.force.com/lightning/page/home')
    
    # Wait for page to load
    wait.until(EC.presence_of_element_located((By.TAG_NAME, 'body')))

    # ---------------- APP LAUNCHER ----------------
    app_launcher = wait.until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, 'button[title="App Launcher"]'))
    )
    app_launcher.click()
    
    # Click View All
    view_all = wait.until(
        EC.element_to_be_clickable((By.XPATH, '//button[text()="View All"]'))
    )
    view_all.click()
    
    # Click Sales app
    sales_app = wait.until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, 'one-app-launcher-app-tile[data-name="Sales"]'))
    )
    sales_app.click()

    # ---------------- LEADS ----------------
    # Click Leads tab
    leads_tab = wait.until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, 'a[title="Leads"]'))
    )
    leads_tab.click()
    
    new_button = wait.until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, "button[name='New']"))
    )
    
    driver.execute_script("arguments[0].click();", new_button)


    # Fill Lead form
    last_name_input = wait.until(
        EC.presence_of_element_located((By.XPATH, '//label[text()="Last Name"]/following::input[1]'))
    )
    last_name_input.clear()
    last_name_input.send_keys('SeleniumLead')
    
    company_input = wait.until(
        EC.presence_of_element_located((By.XPATH, '//label[text()="Company"]/following::input[1]'))
    )
    company_input.clear()
    company_input.send_keys('Selenium Inc')

    # Save
    save_button = wait.until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, 'button[name="SaveEdit"]'))
    )
    save_button.click()

    # ✅ Verify toast message
    toast = wait.until(
        EC.presence_of_element_located((By.CSS_SELECTOR, 'span.toastMessage'))
    )
    assert 'Lead' in toast.text, f"Expected 'Lead' in toast message, but got: {toast.text}"
