## 2024-05-23 - CI Strictness and Framer Motion Cost
**Learning:** This codebase runs builds with `CI=true`, which treats all ESLint warnings (unused vars, missing deps) as fatal errors. Also, `framer-motion` animations in `CountUp` components are computationally expensive and trigger on every parent re-render if not memoized.
**Action:** Always clean up unused imports before attempting a build. Wrap animation-heavy child components in `React.memo` if the parent has frequent state updates (like form inputs).
