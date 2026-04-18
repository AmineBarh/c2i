## 2026-04-18 - Memoization in Admin.jsx
**Learning:** In React components handling high-frequency text input state (e.g., `searchTerm`), filtering lists or calculating derived state sequentially without memoization can cause input lag. Here, `Admin.jsx` was calculating 3 distinct counts sequentially via `.filter()` on every render.
**Action:** Consolidate multiple list derivations into a single `O(N)` loop (like `reduce` or `forEach`) and wrap in `useMemo` to prevent cascading re-renders and computation overhead.
