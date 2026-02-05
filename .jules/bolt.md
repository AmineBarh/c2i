## 2025-02-20 - Jest 27 vs ESM Dependencies
**Learning:** `react-scripts` v5 uses Jest 27 which lacks native ESM support for `node_modules`. Libraries like `react-router-dom` v7 and `axios` v1.x cause "Cannot use import statement outside a module" or resolution errors during testing.
**Action:** Use `jest.mock('module-name', ..., { virtual: true })` in `setupTests.js` to bypass resolution and provide manual mocks for these dependencies.

## 2025-02-20 - JSDOM Missing APIs
**Learning:** Modern React components using `framer-motion` or scroll logic often crash in JSDOM due to missing `IntersectionObserver`, `ResizeObserver`, and `window.scrollTo`.
**Action:** Add global mocks for these APIs in `setupTests.js` to ensure tests pass.
