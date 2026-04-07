## 2025-04-02 - React useMemo optimization for O(N) derived calculations
**Learning:** Performing multiple independent `.filter().length` on a medium-to-large array in a top-level React component like `Admin.jsx` triggers full re-evaluations (multiple O(N) passes) during unrelated state updates, such as simply toggling the sidebar.
**Action:** Consolidate statistical aggregations (counts, sums) into a single `.reduce()` or `.forEach()` loop and memoize the resulting object via `useMemo` when working with high-frequency parent components.
