## 2024-05-22 - Optimizing React Re-renders & Fixing Jest ESM Issues
**Learning:** High-frequency parent updates (e.g., form input) cause expensive re-renders in children using animation libraries like `framer-motion`, even if props don't change. `React.memo` effectively mitigates this.
**Action:** Identify static sections within dynamic pages and memoize them, especially if they contain animations.

**Learning:** `react-scripts` v5 (Jest 27) struggles with ESM-only packages like `react-router-dom` v6+ and `axios` v1+.
**Action:** Implement manual mocks in `setupTests.js` for these libraries to enable unit testing without ejecting or complex configuration changes.
