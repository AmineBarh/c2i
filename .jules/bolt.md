## 2025-02-18 - Frontend Routing Tests
**Learning:** In this `react-scripts` environment, upgrading or using `react-router-dom` v6+ causes module resolution failures in Jest ("Cannot find module 'react-router-dom'"), even though the production build works perfectly.
**Action:** When optimizing routing (e.g., code splitting), prioritize `npm run build` and runtime verification (Playwright/manual) over `npm test` if module errors occur, or investigate mocking `react-router-dom` in `setupTests.js`.
