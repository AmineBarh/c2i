## 2024-03-03 - Optimize list processing in Admin.jsx
**Learning:** React components that render large lists and compute derived states (like counts by category) using multiple `Array.filter` operations block the main thread unnecessarily on every render, especially when user interactions like toggling sidebars trigger frequent re-renders.
**Action:** Use `useMemo` to memoize the results of expensive list processing. Instead of multiple `O(N)` passes, combine them into a single `O(N)` `.reduce()` pass and memoize it.
