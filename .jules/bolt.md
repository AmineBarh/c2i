# Bolt's Journal

## 2025-02-19 - Jest 27 vs Modern ESM Packages
**Learning:** Jest 27 (default in CRA v5) struggles significantly with modern ESM-only packages like `react-router-dom` v7 and `framer-motion` v12. Standard `jest.mock` often fails to resolve the module path if the package.json exports are complex.
**Action:** Use `jest.mock('module-name', () => ({...}), { virtual: true })` in `setupTests.js` to bypass resolution and provide a manual mock implementation. This is more robust than trying to configure `transformIgnorePatterns`.

## 2025-02-19 - Netlify Deployment for CRA in Subdirectory
**Learning:** Netlify deployments for a React app in a subdirectory require a `netlify.toml` at the **repository root** that explicitly sets the `base` directory. Without this, Netlify defaults to the root, can't find `package.json`, or fails to build.
**Action:** Always include a `netlify.toml` with `[build]` configuration setting `base = "subdir"` and appropriate `publish` directory relative to that base. Also ensure SPA routing (redirect `/*` to `/index.html`) is configured.
