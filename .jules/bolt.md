## 2026-02-03 - Jest 27 & ESM Compatibility
**Learning:** `react-scripts` v5 uses Jest 27, which struggles with modern ESM-only packages like `react-router-dom` v7 and `framer-motion`. Standard Jest transforms often fail to process these dependencies correctly.
**Action:** Use manual mocks in `setupTests.js` (with `{ virtual: true }` if necessary) to bypass ESM import issues during testing, rather than trying to configure babel-jest to transform specific node_modules, which is often flaky in CRA.
