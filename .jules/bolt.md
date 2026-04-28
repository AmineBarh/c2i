## 2024-05-18 - Admin component optimized
**Learning:** Learned to apply `useMemo` and consolidate `.filter().length` passes into a single `O(N)` loop to prevent multiple loops when multiple derivations exist.
**Action:** Use this strategy going forward to minimize `O(N)` loops for filtering derived data in large lists.
