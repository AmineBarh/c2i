## 2024-05-23 - Jest Configuration for React Router v7
**Learning:** React Router v7 exports ESM modules which standard Create React App (react-scripts v5) Jest configuration (v27) fails to resolve correctly, leading to "Cannot find module" errors in tests.
**Action:** When testing components using React Router v7 in a CRA environment, mock `react-router-dom` with `{ virtual: true }` in Jest to bypass resolution issues if you cannot upgrade Jest or change build configuration.
