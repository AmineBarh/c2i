## 2025-02-19 - Expensive Animation Components in State-Heavy Parents

**Learning:** Components using expensive animation libraries (like `framer-motion` or `CountUp`) should be memoized (`React.memo`) if they are children of components with frequent state updates (e.g., forms, scroll listeners). In this codebase, `StatsSection` was re-rendering on every keystroke in the `Home` contact form, triggering `CountUp` re-initialization logic.

**Action:** When adding animation-heavy components, always check the parent component's re-render frequency. If the parent manages high-frequency state (like form inputs), wrap the expensive child in `React.memo` to isolate it from unrelated updates.
