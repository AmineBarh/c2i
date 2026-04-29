## 2026-04-29 - Optimization of multiple array passes
**Learning:** Found a performance bottleneck in `Admin.jsx` where the `projects` array was being iterated over four separate times on every render to calculate filtered lists and counts using `.filter().length` and `.filter()`. This triggered redundant `O(N)` recalculations.
**Action:** When calculating counts for multiple distinct categories from an array, always combine the operations into a single `O(N)` `forEach` or `reduce` loop inside a `useMemo` hook rather than running multiple sequential `O(N)` `.filter()` passes.
