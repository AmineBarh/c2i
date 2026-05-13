## 2025-05-13 - Consolidated Filters in useMemo
**Learning:** React re-renders component on state updates like `sidebarOpen` leading to O(N) filtering operations (`projects.filter`) running multiple times unnecessarily. Using multiple filters sequentially on the same array structure scales linearly by the number of variables (O(4N)).
**Action:** Always combine operations into a single O(N) `reduce` loop and wrap it with `useMemo` for any derived list statistics computed from props or state.
