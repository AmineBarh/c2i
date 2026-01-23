## 2025-02-21 - React Lazy Loading & Testing
**Learning:** React Router v7+ is strictly ESM, causing Jest (v27/CRA) to fail resolving imports. Mocking `react-router-dom` with `{ virtual: true }` in `setupTests.js` is a reliable workaround for verifying component logic without upgrading the entire test stack.
**Action:** When working with legacy CRA setups and modern libraries, prioritize environment mocks over configuration changes to avoid "dependency hell".
