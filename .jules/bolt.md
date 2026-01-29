## 2024-05-23 - CI Strictness and Framer Motion Cost
**Learning:** This codebase runs builds with `CI=true`, which treats all ESLint warnings (unused vars, missing deps) as fatal errors. Also, `framer-motion` animations in `CountUp` components are computationally expensive and trigger on every parent re-render if not memoized.
**Action:** Always clean up unused imports before attempting a build. Wrap animation-heavy child components in `React.memo` if the parent has frequent state updates (like form inputs).

## 2024-05-23 - Netlify Deployment Configuration
**Learning:** Netlify deployments for monorepos (or subdirectories) require explicit configuration. Without a `netlify.toml` specifying the `base` directory, the build command may fail or run in the wrong context. Client-side routing also requires a `_redirects` file in the publish directory.
**Action:** Ensure `netlify.toml` exists with `base = "subdir"` and `publish = "build"` settings, and add `_redirects` for SPAs.

## 2024-05-23 - React 19 and Legacy Dependencies
**Learning:** React 19 (even RC/Beta versions) may cause peer dependency conflicts with older tools like `react-scripts` v5. Netlify/CI environments running `npm install` will fail unless `legacy-peer-deps` is enabled.
**Action:** Set `NPM_CONFIG_LEGACY_PEER_DEPS = "true"` in the `[build.environment]` section of `netlify.toml` to ensure successful builds.
