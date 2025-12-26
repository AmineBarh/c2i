## 2024-12-26 - Component Definitions Inside Render Pattern
**Learning:** Defining components inside other components (e.g., `const StatCard = (...) => ...` inside `Dashboard`) forces them to remount on every parent render. This destroys internal state and causes unnecessary DOM thrashing.
**Action:** Always define helper components outside the main component, or memoize them if they must be inside (though moving out is usually cleaner).
