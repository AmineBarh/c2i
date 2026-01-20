## 2024-05-23 - React Router v7 & Jest ESM Resolution
**Learning:** `react-scripts` (Jest 27) struggles with ESM-only packages like `react-router-dom` v7. It fails to resolve imports like `Routes`, `Route`, causing "Cannot find module" errors.
**Action:** When working with modern React Router in legacy `react-scripts` environments, use `jest.mock('react-router-dom', ..., { virtual: true })` in `setupTests.js` to bypass module resolution entirely for tests that don't need routing logic (e.g., smoke tests).

## 2024-05-23 - Code Splitting & Suspense in Tests
**Learning:** Wrapping `Routes` in `Suspense` breaks synchronous tests that expect immediate content availability (`screen.getByText`).
**Action:** Use `await screen.findByText` or `waitFor` in tests involving lazy-loaded routes. Alternatively, for simple smoke tests, assert on static shell elements (like Navbar) that are not lazy-loaded.

## 2024-05-23 - JSDOM Limitations
**Learning:** `window.scrollTo` is not implemented in JSDOM, causing tests for components like `ScrollToTop` to crash.
**Action:** Always mock `window.scrollTo = jest.fn()` in `setupTests.js` or individual test files.
