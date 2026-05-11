## 2024-05-24 - Efficient Derived State with useMemo
**Learning:** Found multiple O(N) array `.filter()` loops evaluating on every render in `Admin.jsx` due to state dependencies. The codebase tends to calculate derived data (like category lengths) via sequential loops without memoization.
**Action:** Always consolidate multiple parallel loops over an array into a single pass (using `reduce` or a standard `for` loop) and wrap computationally expensive derived arrays (like filtering lists) in `useMemo`.
