## 2024-03-24 - Frontend Test Mocks for ESM
**Learning:** React Scripts (Jest 27) fails to resolve `react-router-dom` v7+ ESM exports.
**Action:** When testing components using `react-router-dom`, use `jest.mock('react-router-dom', factory, { virtual: true })`. Also ensure `NavLink` mock handles function children (`{({ isActive }) => ...}`).

## 2024-03-24 - Code Splitting
**Learning:** Large bundle size was reduced by implementing route-based code splitting using `React.lazy` and `Suspense`.
**Action:** Ensure all new page routes are lazy loaded.
