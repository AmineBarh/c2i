
## 2025-05-24 - Admin Projects Optimization
**Learning:** In React components dealing with dynamically categorized lists (like `Admin.jsx` with projects), calculating counts via multiple sequential O(N) `.filter().length` passes becomes a bottleneck as the dataset grows, especially when triggered on every render.
**Action:** Always combine operations into a single O(N) `reduce` pass (or `forEach`) inside a `useMemo` hook when extracting statistics from a single array to prevent cascading performance costs.
