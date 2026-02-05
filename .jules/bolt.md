## 2025-02-20 - Jest 27 vs ESM Dependencies
**Learning:** `react-scripts` v5 uses Jest 27 which lacks native ESM support for `node_modules`. Libraries like `react-router-dom` v7 and `axios` v1.x cause "Cannot use import statement outside a module" or resolution errors during testing.
**Action:** Use `jest.mock('module-name', ..., { virtual: true })` in `setupTests.js` to bypass resolution and provide manual mocks for these dependencies.

## 2025-02-20 - JSDOM Missing APIs
**Learning:** Modern React components using `framer-motion` or scroll logic often crash in JSDOM due to missing `IntersectionObserver`, `ResizeObserver`, and `window.scrollTo`.
**Action:** Add global mocks for these APIs in `setupTests.js` to ensure tests pass.

## 2025-02-20 - CI Build Failures (Netlify/React Scripts)
**Learning:** Netlify and other CI providers set `CI=true` by default, which causes `react-scripts build` to treat all ESLint warnings (unused vars, missing deps) as fatal errors, failing the build.
**Action:** Always run `CI=true npm run build` locally to detect and fix these warnings before pushing, or fix the underlying lint issues (unused variables, exhaustive-deps).

## 2025-02-20 - Netlify Deployment
**Learning:** Projects with a nested frontend directory (like `c2i/`) require a `netlify.toml` in the root with `base = "c2i"` to instruct Netlify where to find the package.json and run the build command. Without this, the deployment fails.
**Action:** Ensure `netlify.toml` exists in the root for monorepo-like structures.
