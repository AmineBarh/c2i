## 2024-05-23 - StatsSection Re-renders
**Learning:** `StatsSection` is a purely presentational component that contains expensive `CountUp` animations (using `framer-motion`). It is a child of `Home` page which has a controlled form that triggers re-renders on every keystroke. This causes unnecessary re-execution of animation hooks in `CountUp`.
**Action:** Wrap `StatsSection` in `React.memo` to prevent re-renders when parent state changes but props remain the same (empty props in this case).
