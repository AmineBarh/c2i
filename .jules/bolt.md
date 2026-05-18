## 2024-05-18 - Dashboard Performance Optimization
**Learning:** The project and training dashboard charts were experiencing significant performance degradation (O(N*M) complexity) due to iterating and `.filter()`ing over the entire dataset repeatedly for every single day in the target interval.
**Action:** When deriving interval-based statistical metrics (like charting items per day), always loop over the dataset once and aggregate counts into a hash map indexed by date format strings, converting an O(N*Days) operation into an O(N) lookup.
