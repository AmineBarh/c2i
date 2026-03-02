
## 2024-03-02 - Memoize expensive array operations in Admin page
**Learning:** Found multiple instances where array filter operations (`O(N)`) and length calculations were being re-evaluated unconditionally on every render in `Admin.jsx`, independent of related state changes (e.g. navigation switches).
**Action:** Consistently apply `useMemo` for derived datasets and aggregate numbers (like length of filtered arrays) that rely heavily on primary lists but don't strictly need recalculation upon unrelated state updates.
