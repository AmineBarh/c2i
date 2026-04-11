## 2025-02-14 - Memoize derived state from arrays
**Learning:** Top-level page components in React that render lists, arrays, or objects that are filtered dynamically often execute O(N) filtering logic on every render, which is expensive and blocks the main thread, especially if the components have inputs triggering rapid re-renders.
**Action:** Use `useMemo` to wrap derived states like `filteredProjects` or `stats` when they iterate over large arrays. Ensure the dependencies list correctly references inputs to the calculation.
