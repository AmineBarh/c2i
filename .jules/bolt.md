## 2024-05-18 - Admin and Type Pages Derived State Optimization
**Learning:** In React components like `Admin.jsx`, doing multiple `O(N)` loop passes on the same array during every render (e.g. for `iotProjects`, `webProjects`, `automationProjects`, and `filteredProjects`) creates a noticeable performance bottleneck during high-frequency user interactions such as typing in a search bar.
**Action:** Combine all O(N) operations into a single loop wrapped in a `useMemo` block to minimize computational cost on every render.
