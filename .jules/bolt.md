## 2026-01-24 - Framer Motion in JSDOM
**Learning:** Components using `framer-motion`'s `useInView` require `IntersectionObserver` to be mocked in JSDOM environment, otherwise tests crash or fail silently.
**Action:** Always add `IntersectionObserver` and `ResizeObserver` mocks in `setupTests.js` when testing projects with `framer-motion`.
