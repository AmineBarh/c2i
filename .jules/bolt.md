## 2025-03-09 - Memoize expensive operations in Admin Dashboard
**Learning:** In React components like `Admin.jsx` that manage high-frequency text input state (e.g. `searchTerm`), derived array calculations (like mapping, filtering, or reducing `O(N)` arrays) execute on every render unless memoized.
**Action:** Always wrap expensive derived state operations inside `useMemo`, and consider consolidating multiple array passes into a single `.reduce()` step to optimize React rendering performance in this codebase.
