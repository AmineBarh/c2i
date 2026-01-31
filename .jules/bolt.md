## 2025-05-27 - [Test Environment & Code Splitting]
**Learning:** `react-router-dom` v7+ is ESM-only and incompatible with Jest 27 (CRA default). A manual mock with `{ virtual: true }` in `setupTests.js` is required to fix "Cannot find module" errors. Additionally, testing the main `App` component without code splitting caused all routes to mount and trigger async side-effects (fetches), leading to `AggregateError` and flaky tests.
**Action:** Always mock ESM dependencies in Jest 27 environments. Use `React.lazy` not just for performance but to isolate route components during testing, preventing unwanted side-effects from eager loading.

## 2025-05-27 - [Build Failures in CI]
**Learning:** Netlify and other CI environments typically run with `CI=true`, which causes Create React App (react-scripts) to treat ESLint warnings as build errors. Local builds might pass with warnings, leading to "works on my machine" issues.
**Action:** Always run `CI=true npm run build` locally to reproduce CI failures. Fix all ESLint warnings (unused vars, missing deps in hooks) before pushing.
