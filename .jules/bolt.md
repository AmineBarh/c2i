## 2025-05-10 - O(N) Array Traversals Consolidation in React Component

**Learning:** When calculating multiple derived statistics from a single array (e.g., getting total count, and counting specific categories), using multiple `.filter().length` calls creates multiple redundant O(N) passes. In components with large lists or frequent state updates, this can become a bottleneck. Consolidating these passes into a single `.reduce()` call significantly reduces the iteration overhead. Wrapping this logic in `useMemo` ensures it only recalculates when relevant dependencies change, avoiding unnecessary work on unrelated re-renders (like sidebar toggles).

**Action:** Look out for multiple consecutive array filter/map operations on the same data set. Combine them into a single `reduce` or `forEach` loop and always memoize derived state that depends on large data sets or complex calculations to prevent cascading performance issues during React renders.
