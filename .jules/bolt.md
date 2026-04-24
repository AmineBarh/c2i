## 2024-05-18 - Admin Project List Render Optimization
**Learning:** Sequential `.filter().length` calls for distinct categories loop over the same array multiple times (O(N) * number of categories). This becomes a performance bottleneck when run on every render in top-level components (like pages).
**Action:** Always combine calculations for multiple distinct categories from a single array into one O(N) `.reduce()` or `.forEach()` loop, and wrap it in `useMemo` to prevent recalculation when unrelated state changes.
