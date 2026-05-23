## 2024-05-23 - Bolt Journal Initialized\n**Learning:** Started performance optimization mission.\n**Action:** Focus on measurable improvements under 50 lines.
## 2024-05-23 - Memoizing Sets and Reducing Array Loops in React
**Learning:** Found an anti-pattern in `Admin.jsx` where multiple sequential `O(N)` `filter().length` passes were executed on every render to calculate category stats, coupled with unmemoized `Set` generations in `Summary.jsx`.
**Action:** Replaced sequential passes with a single `O(N)` `reduce` block and wrapped both the reduce computation and `Set` generations in `useMemo` hooks to prevent high-frequency re-renders from bottlenecking input handling.
