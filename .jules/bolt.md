## 2024-05-17 - Optimize multiple array passes with reduce + useMemo
**Learning:** Combining multiple O(N) `.filter().length` passes into a single `.reduce()` pass and wrapping the result in `useMemo` is a highly effective way to optimize derived state calculations in React components that handle large arrays and frequent re-renders (e.g., search filtering).
**Action:** Always look for opportunities to consolidate multiple array passes into a single iteration, and ensure derived state calculations are memoized when unrelated state changes could trigger unnecessary recalculations.
