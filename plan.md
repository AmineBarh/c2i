1. **Optimize Admin.jsx `filteredProjects` and `category counts`:**
   - Import `useMemo` in `Admin.jsx`.
   - Wrap `filteredProjects` in `useMemo` to prevent O(N) array filtering on every keystroke.
   - Combine the 3 sequential `.filter().length` passes (for `iotProjects`, `webProjects`, `automationProjects`) into a single O(N) `reduce` loop inside a `useMemo` hook.

2. **Optimize Summary.jsx `categories` generation:**
   - Import `useMemo` in `Summary.jsx`.
   - Wrap the `categories` array generation (which includes `.map`, `.filter`, and `Set` creation) in a `useMemo` hook.

3. **Verify the changes:**
   - Run formatting and linting (`pnpm lint` / `npm run lint` if applicable).
   - Run tests (`CI=true npm test`).

4. **Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.**
   - Run `pre_commit_instructions`.

5. **Submit the PR:**
   - Branch: `bolt-performance-admin-summary`
   - Title: `⚡ Bolt: Optimize project filtering and category calculation`
