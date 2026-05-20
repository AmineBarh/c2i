## 2024-05-19 - Optimize Admin panel derived states
**Learning:** Calculating derived states like filtered lists and category counts using multiple `.filter().length` passes inside a component body leads to O(N * M) iterations on every render, which becomes a bottleneck when unrelated UI state (like opening a sidebar) changes.
**Action:** When calculating counts for multiple distinct categories from an array in React, combine the operations into a single O(N) `forEach` or `reduce` loop inside a `useMemo` hook rather than running multiple sequential passes.
