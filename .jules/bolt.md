## 2026-02-07 - StatsSection Memoization
**Learning:** High-frequency state updates in `Home` (contact form) were causing expensive re-renders of `StatsSection` and its `CountUp` children (which use `framer-motion`).
**Action:** Wrapped `StatsSection` in `React.memo` to prevent re-renders when props don't change. This reduced re-renders from 5 to 1 during typing.
