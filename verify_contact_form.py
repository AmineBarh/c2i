from playwright.sync_api import sync_playwright

def run():
    print("Starting Playwright...")
    with sync_playwright() as p:
        print("Launching browser...")
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            print("Navigating to home page...")
            page.goto("http://localhost:3000", timeout=60000)

            print("Waiting for Contact Section...")
            page.wait_for_selector("#contactform", timeout=60000)

            # Scroll to contact form
            contact_section = page.locator("#contactform")
            contact_section.scroll_into_view_if_needed()

            print("Verifying inputs...")
            page.wait_for_selector("input[name='name']")
            page.wait_for_selector("input[name='phone']")
            page.wait_for_selector("input[name='email']")
            page.wait_for_selector("textarea[name='message']")

            print("Typing into inputs to verify interactivity...")
            page.fill("input[name='name']", "Bolt Test")
            page.fill("input[name='phone']", "123456789")
            page.fill("input[name='email']", "bolt@example.com")

            print("Taking screenshot...")
            page.screenshot(path="verification_contact_form.png")
            print("Screenshot saved to verification_contact_form.png")

        except Exception as e:
            print(f"Error: {e}")
            try:
                page.screenshot(path="error_screenshot.png")
                print("Error screenshot saved.")
            except:
                pass
        finally:
            browser.close()
            print("Done.")

if __name__ == "__main__":
    run()
