from playwright.sync_api import sync_playwright

def verify_dashboard():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        try:
            # Navigate to the dashboard page
            # Note: Since we don't have a live backend, we expect the frontend to load
            # and potentially show loading states or empty states.
            # The key verification is that the page RENDERs without crashing.
            page.goto("http://localhost:3000/c2i-2025-admin")

            # Wait for the dashboard to load (look for the header)
            page.wait_for_selector("h1:has-text('C2I & Training Dashboard')", timeout=10000)

            # Take a screenshot of the dashboard
            page.screenshot(path="dashboard_verification.png")
            print("Screenshot taken: dashboard_verification.png")

        except Exception as e:
            print(f"Error: {e}")
            # Take a screenshot even if there's an error to see what's on the screen
            page.screenshot(path="error_screenshot.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_dashboard()
