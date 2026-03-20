
## 2024-05-19 - Top Level Array Filters Triggering Re-renders
**Learning:** Top-level route components (`Admin.jsx`, `WebDev.jsx`, etc.) frequently perform `O(N)` `.filter()` operations to compute derived lists (like `filteredProjects`). Unrelated state changes, like opening a sidebar (`sidebarOpen`) or toggling a modal, trigger these expensive recalculations unnecessarily.
**Action:** Always wrap derived, computationally expensive array and set initializations in `useMemo` hooks, specifying only their true dependencies (e.g., `projects` or `searchTerm`).
