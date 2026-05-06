## 2025-05-06 - Optimized Admin and Summary with useMemo
**Learning:** In React components like `Admin.jsx` and `Summary.jsx`, multiple `O(N)` loops for filtering and calculating metrics (like `totalProjects`, `iotProjects`, etc.) were recalculating on every render, including unrelated state changes like opening/closing the sidebar.
**Action:** Consolidated multiple `.filter().length` passes into a single `.reduce()` loop and wrapped derived states in `useMemo` to ensure expensive recalculations only occur when dependencies (like `projects` or search terms) actually change.
