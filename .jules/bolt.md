
## 2025-03-29 - Admin Dashboard Filtering Optimization
**Learning:** The `Admin` component (`c2i/src/pages/Admin.jsx`) processes `filteredProjects` and category counts using O(N) array loops inside the render body. Whenever unrelated state changes (e.g., toggling the sidebar, switching active sections, or uploading a partner file), these computationally expensive filtering loops run redundantly.
**Action:** When filtering or generating stats from arrays in top-level dashboard pages with unrelated state (like sidebars or modals), always wrap the O(N) operations in `useMemo` hooks. Also, when compiling multiple statistics, combine multiple `.filter(...).length` calls into a single `.reduce()` to reduce iterations from O(M*N) to O(N).
