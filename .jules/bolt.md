## 2024-03-20 - Typing in Modals Triggers O(N) Array Recalculations
**Learning:** In top-level page components (like `Training.jsx`), having a form modal (like the quote request modal) whose state is managed at the top level causes the entire page to re-render on every keystroke. This recalculates unmemoized derived state, like `filteredTrainings` (an O(N) operation), leading to unnecessary CPU overhead.
**Action:** Always wrap expensive derived states (like large array filters or maps) in `useMemo` when they sit alongside high-frequency state updates like controlled text inputs.
