## 2024-06-25 - React Render Optimization
**Learning:** Sequential O(N) array operations (like multiple `.filter().length` checks) performed directly in the render body of components (like Admin.jsx) cause redundant CPU work on every state change, even unrelated ones.
**Action:** Always consolidate multiple array derivations into a single `useMemo` block using `forEach` or `reduce` to prevent O(N*M) recalculations during renders.
