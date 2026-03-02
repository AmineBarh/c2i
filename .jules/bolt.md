## 2026-02-20 - JSDOM Fetch Mocking
**Learning:** In JSDOM environments (used by `react-scripts`), `window.fetch` takes precedence over `global.fetch`. Simply mocking `global.fetch` may not work for components that use `fetch` if JSDOM is configured to provide `window.fetch`.
**Action:** When mocking `fetch` in Jest/JSDOM tests, always mock both `global.fetch` and `window.fetch` (if `window` exists) to ensure consistent behavior across environments.

## 2026-02-20 - React Router v7 & Jest
**Learning:** `react-router-dom` v7+ might cause `Cannot find module` errors in Jest 27 environments due to ESM exports.
**Action:** Use manual mocks in `setupTests.js` or upgrade Jest/configuration to support ESM if possible, but manual mocks are a quick fix for existing test suites.
