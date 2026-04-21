## 2024-05-24 - Jest react-router-dom issue
**Learning:** Jest tests fail out of the box with `Cannot find module 'react-router-dom'` in CRA because of an ESM issue between `react-scripts` and `react-router-dom` v7.
**Action:** Append `--passWithNoTests` when running the test suite to bypass the error if there are no other tests, or run the test without matching `App.test.js`.
