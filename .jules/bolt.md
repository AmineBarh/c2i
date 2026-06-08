
## 2024-05-24 - Admin Projects O(N) Consolidation
**Learning:** Found multiple separate sequential O(N) array loops (`projects.filter((p) => p.type === '...').length`) running unmemoized inside a parent component (`Admin.jsx`) that experiences frequent unrelated state changes (e.g. sidebar toggle). This is an anti-pattern as it needlessly re-iterates over the entire data set multiple times for basic categorization on every render cycle.
**Action:** Consolidate multiple distinct `.filter().length` count passes over the same dataset into a single `reduce` pass, and ensure the resulting count object, as well as complex filtered arrays, are wrapped in `useMemo` so they only recalculate when the source data (`projects`) actually changes.
