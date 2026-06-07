
## 2024-05-18 - Unmemoized filtering on page components
**Learning:** Found an anti-pattern where filtering logic for large lists (`filteredProjects`, `filteredTrainings`) on page components like `WebDev.jsx`, `Automation.jsx`, `Iot.jsx`, and `Training.jsx` was not memoized, causing O(N) recalculations on unrelated renders.
**Action:** Always wrap computationally expensive states like array filtering in `useMemo`, especially on list-heavy page components, to ensure stable references and avoid cascading render performance hits.
