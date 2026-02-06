## 2026-02-06 - Unoptimized Form Updates Triggering Animations
**Learning:** In `Home.jsx`, the contact form's state is lifted to the top-level component, causing every keystroke to re-render the entire page. This includes `StatsSection`, which contains expensive `CountUp` animations using Framer Motion, leading to unnecessary computation and potential jank.
**Action:** When working on pages with form inputs and heavy visual components (like animations), verify if the form state is isolated or memoize the expensive components using `React.memo` to prevent cascading re-renders.
