
## 2024-03-24 - Single Pass Count Memoization
**Learning:** In React apps where multiple derived states count elements in the same list (e.g. `webProjects`, `iotProjects`), chaining multiple `O(N)` `.filter().length` passes on every render can cause performance lag, especially if other unrelated state updates trigger a re-render.
**Action:** Consolidate these counts into a single `O(N)` loop (like `forEach` or `reduce`) wrapped in `useMemo` so that the heavy lifting is only performed once when the underlying array actually changes. Also remember to apply `useMemo` to simple derived states like `filteredTrainings` and static objects to prevent re-evaluation on unrelated fast-changing state like inputs or modals.
