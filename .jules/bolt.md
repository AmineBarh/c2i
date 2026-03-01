## 2024-03-01 - [Avoid Unmemoized Derived State with Input Handlers]
**Learning:** Using search inputs (`onChange`) in high-level components without memoizing derived arrays (`filteredProjects`, `stats`) causes cascading re-renders. A single keystroke triggers expensive array looping (`O(N)`) and repeated `Set` generation, leading to noticeable input lag as N grows.
**Action:** Always wrap computationally expensive derived state with `useMemo` when it resides in a component alongside high-frequency state updates like text inputs.
