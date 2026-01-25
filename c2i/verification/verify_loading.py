import time
from playwright.sync_api import sync_playwright

def verify_app(page):
    print("Navigating to home page...")
    page.goto("http://localhost:3000")

    print("Checking for page content...")
    # Wait for something that is in Home.jsx but lazy loaded
    # e.g. "Solutions expertes en"
    try:
        page.wait_for_selector('text=Solutions expertes en', timeout=30000)
        print("Page loaded successfully.")
    except Exception as e:
        print(f"Page load timeout or error: {e}")
        page.screenshot(path="/home/jules/verification/error.png")
        raise e

    # Screenshot the loaded page
    page.screenshot(path="/home/jules/verification/verification.png")
    print("Screenshot taken.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_app(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
