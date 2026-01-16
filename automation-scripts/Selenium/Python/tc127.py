from playwright.sync_api import Page, expect

def test_lead_creation(page: Page):
    """
    Verify successful Lead creation with required fields in Salesforce
    """
   
    page.set_default_timeout(120000)

    page.goto('https://orgfarm-5694adb5bf-dev-ed.develop.lightning.force.com/lightning/page/home')
    
    # Optional: Wait for page to be ready
    page.wait_for_load_state('networkidle')

    # ---------------- APP LAUNCHER ----------------
    page.wait_for_selector('button[title="App Launcher"]', timeout=60000)
    page.click('button[title="App Launcher"]')
    
    # Click View All
    page.wait_for_selector('button:has-text("View All")')
    page.click('button:has-text("View All")')
    
    # Click Sales app
    page.wait_for_selector('one-app-launcher-app-tile[data-name="Sales"]', timeout=60000)
    page.click('one-app-launcher-app-tile[data-name="Sales"]')
    
    # ---------------- LEADS ----------------
    # 🔹 Click Leads tab
    page.wait_for_selector('a[title="Leads"]', timeout=60000)
    page.click('a[title="Leads"]')

    # 🔹 New Lead
    page.wait_for_selector('a[title="New"]')
    page.click('a[title="New"]')

    # 🔹 Fill Lead form
    page.fill(
        '//label[text()="Last Name"]/following::input[1]',
        'PlaywrightLead'
    )
    page.fill(
        '//label[text()="Company"]/following::input[1]',
        'Playwright Inc'
    )

    # 🔹 Save
    page.click('button[name="SaveEdit"]')

    # ✅ Verify toast
    toast = page.locator('span.toastMessage')
    expect(toast).to_contain_text('Lead')
