## 2024-05-22 - [Jest ESM Incompatibility]
**Learning:** `react-router-dom` v7+ and `axios` are ESM-only, causing `SyntaxError: Cannot use import statement outside a module` in Jest 27 (CRA default).
**Action:** Use manual mocks in `setupTests.js` (with `virtual: true` if needed) to bypass ESM issues instead of attempting to configure Jest/Babel for ESM in a locked environment.

## 2024-05-22 - [Form Input Re-renders]
**Learning:** `Home` component lifted form state to the top level, causing the entire page (including heavy `StatsSection` with animations) to re-render on every keystroke.
**Action:** Memoize heavy static children (`StatsSection`) using `React.memo` to prevent reconciliation during frequent parent state updates.
