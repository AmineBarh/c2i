
## 2025-01-20 - Optimize Interval Iterations
**Learning:** Found a recurring O(N*M) pattern where an array of items (like projects or trainings) was being `.filter()`'ed inside an `eachDayOfInterval` loop based on the item's creation date. This causes significant performance degradation as the dataset and date range scale.
**Action:** Always replace nested loops that aggregate data by time intervals with an O(N) hash map strategy. Pre-process the array to group counts by formatted date strings (e.g., "yyyy-MM-dd"), then iterate the interval using $O(1)$ lookups.
