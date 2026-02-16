# Bolt's Journal

## 2025-02-19 - Jest 27 vs Modern ESM Packages
**Learning:** Jest 27 (default in CRA v5) struggles significantly with modern ESM-only packages like `react-router-dom` v7 and `framer-motion` v12. Standard `jest.mock` often fails to resolve the module path if the package.json exports are complex.
**Action:** Use `jest.mock('module-name', () => ({...}), { virtual: true })` in `setupTests.js` to bypass resolution and provide a manual mock implementation. This is more robust than trying to configure `transformIgnorePatterns`.
