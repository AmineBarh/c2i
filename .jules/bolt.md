## 2026-01-27 - Jest & React Router DOM v7
**Learning:** `react-router-dom` v7+ ESM exports are not compatible with Jest 27 (CRA default) out of the box, causing "Cannot find module" errors even when installed.
**Action:** Use `jest.mock('react-router-dom', ..., { virtual: true })` in `setupTests.js` to bypass module resolution failures.

## 2026-01-27 - Initial Code Splitting
**Learning:** The app was bundling all pages (`Home`, `Iot`, etc.) in the main bundle.
**Action:** Implemented `React.lazy` and `Suspense` for top-level routes to enable code splitting.
