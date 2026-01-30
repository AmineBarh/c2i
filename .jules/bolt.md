## 2026-01-30 - Test Environment vs Performance Verification
**Learning:** Verified that `react-router-dom` v7+ and `axios` (ESM modules) break standard Jest 27 (CRA) tests, making it difficult to verify performance optimizations without extensive mocking in `setupTests.js`.
**Action:** Always check `setupTests.js` for `react-router-dom` and `axios` mocks before attempting to run tests for performance verification.
