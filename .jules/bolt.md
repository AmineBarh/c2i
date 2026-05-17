## 2024-05-17 - Optimize multiple array passes with reduce + useMemo
**Learning:** Combining multiple O(N) `.filter().length` passes into a single `.reduce()` pass and wrapping the result in `useMemo` is a highly effective way to optimize derived state calculations in React components that handle large arrays and frequent re-renders (e.g., search filtering).
**Action:** Always look for opportunities to consolidate multiple array passes into a single iteration, and ensure derived state calculations are memoized when unrelated state changes could trigger unnecessary recalculations.

## 2024-05-17 - Missing netlify.toml causes deployment checks to fail
**Learning:** For a CRA (Create React App) deployed to Netlify, if the `netlify.toml` file is missing, Netlify's deployment checks (like Header rules, Redirect rules) can fail. The file needs to be in the root directory specifying the base directory and redirect rules for SPA routing.
**Action:** When troubleshooting CI/deployment failures for Netlify, ensure `netlify.toml` exists in the repository root and is configured correctly (e.g., `[[redirects]] from = "/*" to = "/index.html" status = 200`).
