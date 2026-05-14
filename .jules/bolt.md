## 2024-05-24 - Optimize Derived State in React Components
**Learning:** Unmemoized array filtering and Set generation inside a component's render body (e.g., in `Summary.jsx`) triggers expensive `O(N)` recalculations on every render, which is particularly problematic for high-frequency input changes like search keystrokes.
**Action:** Always memoize derived, computationally expensive states like array loops or `Set` generations using `useMemo` when working with high-frequency text inputs to prevent cascading re-renders and input lag.
