## 2026-01-17 - React Router v7 & Jest Mocking
**Learning:** `react-scripts` (Jest 27) fails to resolve ESM exports from `react-router-dom` v7+.
**Action:** Always mock `react-router-dom` with `{ virtual: true }` and manual component implementations when testing in this environment.
