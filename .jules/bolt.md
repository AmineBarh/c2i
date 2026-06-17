## 2025-02-18 - Admin Panel Filtering Optimization
**Learning:** Found a classic React anti-pattern in the Admin panel where derived state (filtering an array and calculating stats via multiple O(N) passes) was being recalculated on every render, including tab switches.
**Action:** Always wrap computationally expensive derived state (especially operations dependent on text input state like search) in `useMemo` and consolidate multiple O(N) operations (like sequential filters) into a single O(N) `.reduce()` loop.
