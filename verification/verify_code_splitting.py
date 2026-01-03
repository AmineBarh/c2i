from playwright.sync_api import sync_playwright
import time

def verify_code_splitting():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Navigate to the home page served by 'serve'
        # Assuming serve is running on port 3000 (default)
        page.goto("http://localhost:3000")

        # Wait for the home page content to load
        page.wait_for_selector("text=Solutions expertes en")

        # Take a screenshot of the home page
        page.screenshot(path="verification/home_page.png")
        print("Home page screenshot taken.")

        # Navigate to another route to trigger lazy loading
        # We need to ensure the spinner or the new content appears
        # Clicking 'Contactez-nous' which scrolls might not trigger new route if it's hash link
        # Let's click on 'Learn More' in Automation card to go to /automation

        # Find the link to /automation
        automation_link = page.locator("a[href='/automation']")
        if automation_link.count() > 0:
            automation_link.first.click()

            # Wait for content on the automation page
            # Assuming there is some unique text there
            # Since I don't know the exact content of Automation.jsx, I'll wait for URL change and a generic check
            page.wait_for_url("**/automation")

            # Take a screenshot of the automation page
            page.screenshot(path="verification/automation_page.png")
            print("Automation page screenshot taken.")
        else:
            print("Automation link not found")

        browser.close()

if __name__ == "__main__":
    verify_code_splitting()
