## 2025-02-28 - Unused variables cause CI pipeline build failures in Create React App via process.env.CI
**Learning:** In standard Create React App deployments on platforms like Netlify, `process.env.CI = true` is set by default. This causes `react-scripts build` to treat all ESLint warnings (such as `no-unused-vars` like an unused `useEffect` or `useRef`) as fatal errors. This leads to generic Netlify deploy errors like "Pages changed" or "Header rules" failing, masking the true build failure.
**Action:** Always run `CI=true npm run build` locally before pushing to catch these warnings as errors. Ensure any file you modify (even slightly) has all its lint warnings resolved, as ignoring them will break the deploy.

## 2025-02-28 - Netlify Router Configuration for Monorepos
**Learning:** Netlify deployments of Create React App within a subdirectory (`c2i`) will fail routing correctly (leading to Redirect/Header rule check failures) unless a `netlify.toml` file exists explicitly inside the subdirectory. It must declare `publish = "build"` and `command = "npm run build"` and provide a `[[redirects]]` block mapping `/*` to `/index.html`.
**Action:** When working with Create React App on Netlify, always verify SPA routing rules are explicitly configured in a `netlify.toml` file at the root of the frontend context.
