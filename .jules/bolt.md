## 2025-05-12 - Consolidating O(N) filters into single reduce for derived state
**Learning:** Using multiple `.filter().length` calls on the same array to calculate stats for different categories leads to multiple $O(N)$ passes over the same data. In React, if this is done directly in the render body, it executes on every re-render.
**Action:** Always consolidate multiple aggregate calculations over a single array into a single $O(N)$ `.reduce()` pass and memoize the result with `useMemo` to prevent unnecessary recalculations.
