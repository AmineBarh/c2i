
## 2024-05-18 - Route Code Splitting
**Learning:** Initial tests fail with Suspense in JSDOM because JSDOM does not implement `window.scrollTo` (used by ScrollToTop) and `act(...)` warnings occur.
**Action:** The tests pass when bypassing these JSDOM limitations, but tests involving lazy components shouldn't rely on immediate synchronous assertions of inner content unless awaited. The initial bundle size decreased significantly (Main JS from ~274kB to ~91kB, a reduction of ~183kB).
