## 2026-06-04 - Array filtering inside render functions
**Learning:** In React, running O(N) array filtering (e.g. `projects.filter(...)`) at the top level of a component means the array is recalculated on *every single render*, even if the inputs (like `projects` or `searchTerm`) haven't changed. In `Admin.jsx`, multiple sequential filters were being run to calculate counts for different categories.
**Action:** Use `useMemo` to cache derived data arrays and combine multiple sequential `.filter().length` calls into a single `.reduce()` pass to reduce loop overhead.
