
## 2024-05-19 - WebDev Component Re-renders
**Learning:** Found an $O(N)$ list filtering operation `projects.filter(...)` inside the `WebDev.jsx` component that was executing on every render cycle regardless of whether its dependencies changed. This is a common React anti-pattern that leads to unnecessary CPU cycles when managing lists.
**Action:** Always wrap derived list states that depend on array methods (like `.filter` or `.map`) in `useMemo` when they rely on props or state that don't change on every render, ensuring the calculation is only performed when necessary.
