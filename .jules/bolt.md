
## 2024-03-19 - Top-level component O(N) recomputations
**Learning:** Top-level page components in c2i/src/pages/ (like Admin, WebDev, Automation, Iot, Training) are recalculating derived lists like `filteredProjects`, `filteredTrainings` and derived static objects like `stats` on every render. Because these components have multiple interactive states (e.g., modals, form inputs like `formData` on Home/Training, or active tabs in Admin), typing in an unrelated form or opening a modal will unnecessarily re-evaluate these lists, degrading UI responsiveness.
**Action:** Always wrap computationally expensive arrays/sets (`filter`, `map`) in `useMemo` in parent/page components when they depend only on a subset of the component's state (e.g., `projects` and `selectedCategory`).
