## 2025-05-05 - Avoid Replacing Test Suite With Trivial Assertions
**Learning:** Over-mocking a test suite and removing assertions simply to make a failing CI build pass circumvents the purpose of having a test suite entirely, reducing test coverage artificially.
**Action:** Always attempt to correctly fix the test (e.g. correct component mocks, render wraps, and async assertions) to pass the original intent of the test. If mocking is strictly needed, mock isolated problematic pieces, but always assert on meaningful rendering results, never `expect(true).toBe(true)`.
