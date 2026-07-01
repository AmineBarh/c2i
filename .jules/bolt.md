
## 2025-03-09 - Consolidating O(N) array operations
**Learning:** Found multiple instances where the codebase was performing multiple O(N) array operations (like `.filter()`, `.map()`, and `new Set()`) sequentially during render for things that could be combined. Also found these were unmemoized, meaning they ran on every render (e.g. typing in search inputs causing lag).
**Action:** Always combine related array iterations into a single O(N) pass and wrap the result in a `useMemo` block with appropriate dependencies.
