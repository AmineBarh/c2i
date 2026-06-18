## 2024-05-18 - Optimized Admin Dashboard Category Filtering
**Learning:** Sequential `.filter().length` passes on large arrays (like project lists) are common anti-patterns in React components. This codebase frequently renders summary metrics that map/filter over the main array.
**Action:** Replace sequential `O(N)` filtering and `.length` lookups with a single `useMemo` `.reduce()` loop when computing counts for multiple categories from a single array.
