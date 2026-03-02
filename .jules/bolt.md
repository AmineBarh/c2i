## 2024-05-23 - Jest/ESM Resolution & Lazy Loading Tests
**Learning:** `react-scripts` (Jest 27) fails to resolve `react-router-dom` v6 ESM exports, causing "Unexpected token export" errors. Testing `React.lazy` components requires asynchronous queries (`findBy*`) because `Suspense` renders a fallback initially.
**Action:** When using `React.lazy`, always use `await screen.findBy...` in tests. If ESM errors persist with `react-router-dom` in Jest 27, mock the library (`jest.mock("react-router-dom", ...)`).
