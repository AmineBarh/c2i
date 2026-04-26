## 2024-05-18 - Avoid multiple sequential O(N) filters for derived state
**Learning:** Calculating project counts for different categories in `Admin.jsx` used multiple sequential `.filter().length` passes, resulting in multiple `O(N)` loops on every render.
**Action:** Combine category counting into a single `O(N)` pass using `.reduce()` inside a `useMemo` hook to compute multiple derived state counts simultaneously.
