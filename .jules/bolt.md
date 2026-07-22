## 2024-05-15 - Hash Map Optimization for Interval Data
**Learning:** In dashboards utilizing `date-fns` for trailing intervals, recalculating the subset for each step via nested O(D*N) mapping/filtering blocks the main thread at scale. Relying on `.filter()` inside `.map()` iterations masks the exponential growth of operations as data volume increases.
**Action:** When grouping time series metrics for charting, leverage a single O(N) pass to pre-compute counts into a dictionary (Hash Map) using a discrete string format (like `yyyy MMM dd`), enabling an O(D) mapped extraction.
