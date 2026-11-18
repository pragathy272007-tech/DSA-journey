// Pre-generated Seed Dataset for DSA Journey
import { Checklist, Topic, Task } from '../db/types';

export const SEED_CHECKLIST: Checklist = {
  "id": "chk_seed_12week",
  "title": "12-Week DSA Master Curriculum",
  "source_type": "default",
  "created_at": "2026-11-17T18:38:19.753Z"
};
export const SEED_TOPICS: Topic[] = [
  {
    "id": "top_week_1",
    "checklist_id": "chk_seed_12week",
    "week_number": 1,
    "topic_number": 1,
    "title": "Arrays & Hashing",
    "concepts": [
      "Array Representation & Dynamic Arrays (Vector/ArrayList)",
      "Hash Maps & Hash Sets (Bucket Arrays, Collision Resolution)",
      "Prefix Sums & Frequency Counting",
      "Sliding Window with Hash Tables",
      "Dutch National Flag Algorithm"
    ],
    "order_index": 0
  },
  {
    "id": "top_week_2",
    "checklist_id": "chk_seed_12week",
    "week_number": 2,
    "topic_number": 2,
    "title": "Two Pointers & Sliding Window",
    "concepts": [
      "Opposite Direction Pointers (Converging)",
      "Same Direction Pointers (Fast & Slow, Sliding Window)",
      "Fixed Size Window vs Dynamic Window",
      "Two Pointer Shrinking Conditions",
      "Multi-pointer Deduplication (3Sum, 4Sum)"
    ],
    "order_index": 1
  },
  {
    "id": "top_week_3",
    "checklist_id": "chk_seed_12week",
    "week_number": 3,
    "topic_number": 3,
    "title": "Stack & Binary Search",
    "concepts": [
      "Monotonic Stack (Increasing & Decreasing)",
      "Evaluating Expressions (Infix, Postfix, RPN)",
      "Classic Binary Search Bounds (left <= right vs left < right)",
      "Binary Search on Answer Space (Predicate Functions)",
      "Rotated Sorted Array Invariants"
    ],
    "order_index": 2
  },
  {
    "id": "top_week_4",
    "checklist_id": "chk_seed_12week",
    "week_number": 4,
    "topic_number": 4,
    "title": "Linked List",
    "concepts": [
      "Singly vs Doubly Linked Lists",
      "Sentinel (Dummy) Nodes for Edge Handling",
      "Floyd's Cycle-Finding Algorithm (Tortoise & Hare)",
      "In-place Pointer Reversal",
      "Fast & Slow Pointer for Middle Finding"
    ],
    "order_index": 3
  },
  {
    "id": "top_week_5",
    "checklist_id": "chk_seed_12week",
    "week_number": 5,
    "topic_number": 5,
    "title": "Binary Trees",
    "concepts": [
      "Tree Traversals: Preorder, Inorder, Postorder, Level-Order (BFS)",
      "Binary Search Tree (BST) Properties & Inorder Invariant",
      "Recursive Depth-First Search on Trees",
      "Lowest Common Ancestor Logic",
      "Tree Serialization & Deserialization"
    ],
    "order_index": 4
  },
  {
    "id": "top_week_6",
    "checklist_id": "chk_seed_12week",
    "week_number": 6,
    "topic_number": 6,
    "title": "Heaps & Priority Queues",
    "concepts": [
      "Min-Heap & Max-Heap Fundamentals & Array Representation",
      "Heapify Algorithm: O(N) vs Repeated Insert O(N log N)",
      "Top K Elements Pattern",
      "Two Heaps Pattern for Streaming Median",
      "Task Scheduling with Cooldown & Frequency Maps"
    ],
    "order_index": 5
  },
  {
    "id": "top_week_7",
    "checklist_id": "chk_seed_12week",
    "week_number": 7,
    "topic_number": 7,
    "title": "Backtracking & Tries",
    "concepts": [
      "State-Space Tree Exploration & Pruning",
      "Combinations, Permutations, Subsets Templates",
      "Trie (Prefix Tree) Node Structure & Insert/Search/StartsWith",
      "Backtracking with Grid Boundaries & Visited Sets",
      "Bitmask Backtracking & Pruning"
    ],
    "order_index": 6
  },
  {
    "id": "top_week_8",
    "checklist_id": "chk_seed_12week",
    "week_number": 8,
    "topic_number": 8,
    "title": "Graphs I (BFS & DFS)",
    "concepts": [
      "Graph Representations (Adjacency List vs Adjacency Matrix)",
      "Breadth-First Search (Queue, Shortest Path in Unweighted Graphs)",
      "Depth-First Search (Recursion/Stack, Connected Components)",
      "Matrix Graphs (4-Directional & 8-Directional Traversals)",
      "Multi-Source BFS (Rotting Oranges, Distance Transform)"
    ],
    "order_index": 7
  },
  {
    "id": "top_week_9",
    "checklist_id": "chk_seed_12week",
    "week_number": 9,
    "topic_number": 9,
    "title": "Graphs II (Advanced & Topo Sort)",
    "concepts": [
      "Topological Sort via Kahn's Algorithm (In-degree) & DFS Post-Order",
      "Cycle Detection in Directed vs Undirected Graphs",
      "Disjoint Set Union (Union-Find with Path Compression & Rank)",
      "Dijkstra's Algorithm for Shortest Paths in Weighted Graphs",
      "Hierholzer's Algorithm for Eulerian Paths"
    ],
    "order_index": 8
  },
  {
    "id": "top_week_10",
    "checklist_id": "chk_seed_12week",
    "week_number": 10,
    "topic_number": 10,
    "title": "1-D Dynamic Programming",
    "concepts": [
      "Overlapping Subproblems & Optimal Substructure",
      "Top-Down (Memoization) vs Bottom-Up (Tabulation)",
      "Space Optimization (State Reduction to O(1) or O(K))",
      "Decision Making / Robber State Transitions",
      "Longest Increasing Subsequence Patterns (O(N^2) DP & O(N log N) Binary Search)"
    ],
    "order_index": 9
  },
  {
    "id": "top_week_11",
    "checklist_id": "chk_seed_12week",
    "week_number": 11,
    "topic_number": 11,
    "title": "2-D Dynamic Programming",
    "concepts": [
      "Grid DP: Unique Paths, Minimum Path Sum",
      "String Matching & Sequence DP: LCS, Edit Distance",
      "Knapsack 0/1 & Unbounded Knapsack",
      "State Machine DP (Stock Trading with Cooldown / Fee)",
      "Interval DP (Burst Balloons, Matrix Chain Multiplication)"
    ],
    "order_index": 10
  },
  {
    "id": "top_week_12",
    "checklist_id": "chk_seed_12week",
    "week_number": 12,
    "topic_number": 12,
    "title": "Greedy, Intervals & Bit Manipulation",
    "concepts": [
      "Greedy Choice Property & Local Optimal Substructure",
      "Interval Scheduling & Interval Merging Patterns",
      "Bitwise Operators (&, |, ^, ~, <<, >>)",
      "Bitmasking & Submask Enumeration",
      "Two's Complement & Brian Kernighan's Algorithm"
    ],
    "order_index": 11
  }
];
export const SEED_TASKS: Task[] = [
  {
    "id": "tsk_contains-duplicate",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_1",
    "topic_ids": [
      "top_week_1"
    ],
    "title": "Contains Duplicate",
    "slug": "contains-duplicate",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/contains-duplicate/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 0
  },
  {
    "id": "tsk_valid-anagram",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_1",
    "topic_ids": [
      "top_week_1",
      "top_week_12"
    ],
    "title": "Valid Anagram",
    "slug": "valid-anagram",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/valid-anagram/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 1
  },
  {
    "id": "tsk_two-sum",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_1",
    "topic_ids": [
      "top_week_1",
      "top_week_12"
    ],
    "title": "Two Sum",
    "slug": "two-sum",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/two-sum/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 2
  },
  {
    "id": "tsk_replace-elements-with-greatest-element-on-right-side",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_1",
    "topic_ids": [
      "top_week_1"
    ],
    "title": "Replace Elements with Greatest Element on Right Side",
    "slug": "replace-elements-with-greatest-element-on-right-side",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 3
  },
  {
    "id": "tsk_is-subsequence",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_1",
    "topic_ids": [
      "top_week_1"
    ],
    "title": "Is Subsequence",
    "slug": "is-subsequence",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/is-subsequence/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 4
  },
  {
    "id": "tsk_group-anagrams",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_1",
    "topic_ids": [
      "top_week_1"
    ],
    "title": "Group Anagrams",
    "slug": "group-anagrams",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/group-anagrams/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 5
  },
  {
    "id": "tsk_top-k-frequent-elements",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_1",
    "topic_ids": [
      "top_week_1"
    ],
    "title": "Top K Frequent Elements",
    "slug": "top-k-frequent-elements",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/top-k-frequent-elements/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 6
  },
  {
    "id": "tsk_product-of-array-except-self",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_1",
    "topic_ids": [
      "top_week_1"
    ],
    "title": "Product of Array Except Self",
    "slug": "product-of-array-except-self",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/product-of-array-except-self/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 7
  },
  {
    "id": "tsk_valid-sudoku",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_1",
    "topic_ids": [
      "top_week_1"
    ],
    "title": "Valid Sudoku",
    "slug": "valid-sudoku",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/valid-sudoku/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 8
  },
  {
    "id": "tsk_longest-consecutive-sequence",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_1",
    "topic_ids": [
      "top_week_1"
    ],
    "title": "Longest Consecutive Sequence",
    "slug": "longest-consecutive-sequence",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/longest-consecutive-sequence/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 9
  },
  {
    "id": "tsk_first-missing-positive",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_1",
    "topic_ids": [
      "top_week_1"
    ],
    "title": "First Missing Positive",
    "slug": "first-missing-positive",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/first-missing-positive/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 10
  },
  {
    "id": "tsk_encode-and-decode-strings",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_1",
    "topic_ids": [
      "top_week_1"
    ],
    "title": "Encode and Decode Strings",
    "slug": "encode-and-decode-strings",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/encode-and-decode-strings/",
    "is_paid_only": true,
    "status": "premium",
    "order_index": 11
  },
  {
    "id": "tsk_valid-palindrome",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_2",
    "topic_ids": [
      "top_week_2"
    ],
    "title": "Valid Palindrome",
    "slug": "valid-palindrome",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/valid-palindrome/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 12
  },
  {
    "id": "tsk_two-sum-ii-input-array-is-sorted",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_2",
    "topic_ids": [
      "top_week_2"
    ],
    "title": "Two Sum II - Input Array Is Sorted",
    "slug": "two-sum-ii-input-array-is-sorted",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 13
  },
  {
    "id": "tsk_best-time-to-buy-and-sell-stock",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_2",
    "topic_ids": [
      "top_week_2"
    ],
    "title": "Best Time to Buy and Sell Stock",
    "slug": "best-time-to-buy-and-sell-stock",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 14
  },
  {
    "id": "tsk_3sum",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_2",
    "topic_ids": [
      "top_week_2"
    ],
    "title": "3Sum",
    "slug": "3sum",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/3sum/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 15
  },
  {
    "id": "tsk_container-with-most-water",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_2",
    "topic_ids": [
      "top_week_2"
    ],
    "title": "Container With Most Water",
    "slug": "container-with-most-water",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/container-with-most-water/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 16
  },
  {
    "id": "tsk_longest-substring-without-repeating-characters",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_2",
    "topic_ids": [
      "top_week_2"
    ],
    "title": "Longest Substring Without Repeating Characters",
    "slug": "longest-substring-without-repeating-characters",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 17
  },
  {
    "id": "tsk_longest-repeating-character-replacement",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_2",
    "topic_ids": [
      "top_week_2"
    ],
    "title": "Longest Repeating Character Replacement",
    "slug": "longest-repeating-character-replacement",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/longest-repeating-character-replacement/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 18
  },
  {
    "id": "tsk_permutation-in-string",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_2",
    "topic_ids": [
      "top_week_2"
    ],
    "title": "Permutation in String",
    "slug": "permutation-in-string",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/permutation-in-string/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 19
  },
  {
    "id": "tsk_trapping-rain-water",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_2",
    "topic_ids": [
      "top_week_2"
    ],
    "title": "Trapping Rain Water",
    "slug": "trapping-rain-water",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/trapping-rain-water/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 20
  },
  {
    "id": "tsk_minimum-window-substring",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_2",
    "topic_ids": [
      "top_week_2"
    ],
    "title": "Minimum Window Substring",
    "slug": "minimum-window-substring",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/minimum-window-substring/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 21
  },
  {
    "id": "tsk_sliding-window-maximum",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_2",
    "topic_ids": [
      "top_week_2"
    ],
    "title": "Sliding Window Maximum",
    "slug": "sliding-window-maximum",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/sliding-window-maximum/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 22
  },
  {
    "id": "tsk_valid-parentheses",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_3",
    "topic_ids": [
      "top_week_3"
    ],
    "title": "Valid Parentheses",
    "slug": "valid-parentheses",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/valid-parentheses/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 23
  },
  {
    "id": "tsk_binary-search",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_3",
    "topic_ids": [
      "top_week_3"
    ],
    "title": "Binary Search",
    "slug": "binary-search",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/binary-search/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 24
  },
  {
    "id": "tsk_search-insert-position",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_3",
    "topic_ids": [
      "top_week_3"
    ],
    "title": "Search Insert Position",
    "slug": "search-insert-position",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/search-insert-position/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 25
  },
  {
    "id": "tsk_min-stack",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_3",
    "topic_ids": [
      "top_week_3"
    ],
    "title": "Min Stack",
    "slug": "min-stack",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/min-stack/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 26
  },
  {
    "id": "tsk_evaluate-reverse-polish-notation",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_3",
    "topic_ids": [
      "top_week_3"
    ],
    "title": "Evaluate Reverse Polish Notation",
    "slug": "evaluate-reverse-polish-notation",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 27
  },
  {
    "id": "tsk_daily-temperatures",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_3",
    "topic_ids": [
      "top_week_3"
    ],
    "title": "Daily Temperatures",
    "slug": "daily-temperatures",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/daily-temperatures/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 28
  },
  {
    "id": "tsk_search-a-2d-matrix",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_3",
    "topic_ids": [
      "top_week_3"
    ],
    "title": "Search a 2D Matrix",
    "slug": "search-a-2d-matrix",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/search-a-2d-matrix/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 29
  },
  {
    "id": "tsk_koko-eating-bananas",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_3",
    "topic_ids": [
      "top_week_3"
    ],
    "title": "Koko Eating Bananas",
    "slug": "koko-eating-bananas",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/koko-eating-bananas/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 30
  },
  {
    "id": "tsk_find-minimum-in-rotated-sorted-array",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_3",
    "topic_ids": [
      "top_week_3"
    ],
    "title": "Find Minimum in Rotated Sorted Array",
    "slug": "find-minimum-in-rotated-sorted-array",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 31
  },
  {
    "id": "tsk_search-in-rotated-sorted-array",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_3",
    "topic_ids": [
      "top_week_3"
    ],
    "title": "Search in Rotated Sorted Array",
    "slug": "search-in-rotated-sorted-array",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 32
  },
  {
    "id": "tsk_largest-rectangle-in-histogram",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_3",
    "topic_ids": [
      "top_week_3"
    ],
    "title": "Largest Rectangle in Histogram",
    "slug": "largest-rectangle-in-histogram",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/largest-rectangle-in-histogram/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 33
  },
  {
    "id": "tsk_median-of-two-sorted-arrays",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_3",
    "topic_ids": [
      "top_week_3"
    ],
    "title": "Median of Two Sorted Arrays",
    "slug": "median-of-two-sorted-arrays",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 34
  },
  {
    "id": "tsk_reverse-linked-list",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_4",
    "topic_ids": [
      "top_week_4"
    ],
    "title": "Reverse Linked List",
    "slug": "reverse-linked-list",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/reverse-linked-list/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 35
  },
  {
    "id": "tsk_merge-two-sorted-lists",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_4",
    "topic_ids": [
      "top_week_4"
    ],
    "title": "Merge Two Sorted Lists",
    "slug": "merge-two-sorted-lists",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/merge-two-sorted-lists/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 36
  },
  {
    "id": "tsk_linked-list-cycle",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_4",
    "topic_ids": [
      "top_week_4"
    ],
    "title": "Linked List Cycle",
    "slug": "linked-list-cycle",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/linked-list-cycle/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 37
  },
  {
    "id": "tsk_reorder-list",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_4",
    "topic_ids": [
      "top_week_4"
    ],
    "title": "Reorder List",
    "slug": "reorder-list",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/reorder-list/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 38
  },
  {
    "id": "tsk_remove-nth-node-from-end-of-list",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_4",
    "topic_ids": [
      "top_week_4"
    ],
    "title": "Remove Nth Node From End of List",
    "slug": "remove-nth-node-from-end-of-list",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 39
  },
  {
    "id": "tsk_copy-list-with-random-pointer",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_4",
    "topic_ids": [
      "top_week_4"
    ],
    "title": "Copy List with Random Pointer",
    "slug": "copy-list-with-random-pointer",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/copy-list-with-random-pointer/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 40
  },
  {
    "id": "tsk_add-two-numbers",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_4",
    "topic_ids": [
      "top_week_4"
    ],
    "title": "Add Two Numbers",
    "slug": "add-two-numbers",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/add-two-numbers/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 41
  },
  {
    "id": "tsk_find-the-duplicate-number",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_4",
    "topic_ids": [
      "top_week_4"
    ],
    "title": "Find the Duplicate Number",
    "slug": "find-the-duplicate-number",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/find-the-duplicate-number/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 42
  },
  {
    "id": "tsk_lru-cache",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_4",
    "topic_ids": [
      "top_week_4"
    ],
    "title": "LRU Cache",
    "slug": "lru-cache",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/lru-cache/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 43
  },
  {
    "id": "tsk_merge-k-sorted-lists",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_4",
    "topic_ids": [
      "top_week_4"
    ],
    "title": "Merge k Sorted Lists",
    "slug": "merge-k-sorted-lists",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/merge-k-sorted-lists/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 44
  },
  {
    "id": "tsk_reverse-nodes-in-k-group",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_4",
    "topic_ids": [
      "top_week_4"
    ],
    "title": "Reverse Nodes in k-Group",
    "slug": "reverse-nodes-in-k-group",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/reverse-nodes-in-k-group/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 45
  },
  {
    "id": "tsk_invert-binary-tree",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_5",
    "topic_ids": [
      "top_week_5"
    ],
    "title": "Invert Binary Tree",
    "slug": "invert-binary-tree",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/invert-binary-tree/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 46
  },
  {
    "id": "tsk_maximum-depth-of-binary-tree",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_5",
    "topic_ids": [
      "top_week_5"
    ],
    "title": "Maximum Depth of Binary Tree",
    "slug": "maximum-depth-of-binary-tree",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 47
  },
  {
    "id": "tsk_diameter-of-binary-tree",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_5",
    "topic_ids": [
      "top_week_5"
    ],
    "title": "Diameter of Binary Tree",
    "slug": "diameter-of-binary-tree",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/diameter-of-binary-tree/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 48
  },
  {
    "id": "tsk_balanced-binary-tree",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_5",
    "topic_ids": [
      "top_week_5"
    ],
    "title": "Balanced Binary Tree",
    "slug": "balanced-binary-tree",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/balanced-binary-tree/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 49
  },
  {
    "id": "tsk_same-tree",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_5",
    "topic_ids": [
      "top_week_5"
    ],
    "title": "Same Tree",
    "slug": "same-tree",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/same-tree/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 50
  },
  {
    "id": "tsk_subtree-of-another-tree",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_5",
    "topic_ids": [
      "top_week_5"
    ],
    "title": "Subtree of Another Tree",
    "slug": "subtree-of-another-tree",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/subtree-of-another-tree/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 51
  },
  {
    "id": "tsk_lowest-common-ancestor-of-a-binary-search-tree",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_5",
    "topic_ids": [
      "top_week_5"
    ],
    "title": "Lowest Common Ancestor of a Binary Search Tree",
    "slug": "lowest-common-ancestor-of-a-binary-search-tree",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 52
  },
  {
    "id": "tsk_binary-tree-level-order-traversal",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_5",
    "topic_ids": [
      "top_week_5"
    ],
    "title": "Binary Tree Level Order Traversal",
    "slug": "binary-tree-level-order-traversal",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 53
  },
  {
    "id": "tsk_binary-tree-right-side-view",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_5",
    "topic_ids": [
      "top_week_5"
    ],
    "title": "Binary Tree Right Side View",
    "slug": "binary-tree-right-side-view",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/binary-tree-right-side-view/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 54
  },
  {
    "id": "tsk_count-good-nodes-in-binary-tree",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_5",
    "topic_ids": [
      "top_week_5"
    ],
    "title": "Count Good Nodes in Binary Tree",
    "slug": "count-good-nodes-in-binary-tree",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/count-good-nodes-in-binary-tree/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 55
  },
  {
    "id": "tsk_validate-binary-search-tree",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_5",
    "topic_ids": [
      "top_week_5"
    ],
    "title": "Validate Binary Search Tree",
    "slug": "validate-binary-search-tree",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/validate-binary-search-tree/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 56
  },
  {
    "id": "tsk_kth-smallest-element-in-a-bst",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_5",
    "topic_ids": [
      "top_week_5"
    ],
    "title": "Kth Smallest Element in a BST",
    "slug": "kth-smallest-element-in-a-bst",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 57
  },
  {
    "id": "tsk_construct-binary-tree-from-preorder-and-inorder-traversal",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_5",
    "topic_ids": [
      "top_week_5"
    ],
    "title": "Construct Binary Tree from Preorder and Inorder Traversal",
    "slug": "construct-binary-tree-from-preorder-and-inorder-traversal",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 58
  },
  {
    "id": "tsk_binary-tree-maximum-path-sum",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_5",
    "topic_ids": [
      "top_week_5"
    ],
    "title": "Binary Tree Maximum Path Sum",
    "slug": "binary-tree-maximum-path-sum",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 59
  },
  {
    "id": "tsk_serialize-and-deserialize-binary-tree",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_5",
    "topic_ids": [
      "top_week_5"
    ],
    "title": "Serialize and Deserialize Binary Tree",
    "slug": "serialize-and-deserialize-binary-tree",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 60
  },
  {
    "id": "tsk_kth-largest-element-in-a-stream",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_6",
    "topic_ids": [
      "top_week_6"
    ],
    "title": "Kth Largest Element in a Stream",
    "slug": "kth-largest-element-in-a-stream",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 61
  },
  {
    "id": "tsk_last-stone-weight",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_6",
    "topic_ids": [
      "top_week_6"
    ],
    "title": "Last Stone Weight",
    "slug": "last-stone-weight",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/last-stone-weight/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 62
  },
  {
    "id": "tsk_k-closest-points-to-origin",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_6",
    "topic_ids": [
      "top_week_6"
    ],
    "title": "K Closest Points to Origin",
    "slug": "k-closest-points-to-origin",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/k-closest-points-to-origin/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 63
  },
  {
    "id": "tsk_kth-largest-element-in-an-array",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_6",
    "topic_ids": [
      "top_week_6"
    ],
    "title": "Kth Largest Element in an Array",
    "slug": "kth-largest-element-in-an-array",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 64
  },
  {
    "id": "tsk_task-scheduler",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_6",
    "topic_ids": [
      "top_week_6"
    ],
    "title": "Task Scheduler",
    "slug": "task-scheduler",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/task-scheduler/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 65
  },
  {
    "id": "tsk_design-twitter",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_6",
    "topic_ids": [
      "top_week_6"
    ],
    "title": "Design Twitter",
    "slug": "design-twitter",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/design-twitter/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 66
  },
  {
    "id": "tsk_reorganize-string",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_6",
    "topic_ids": [
      "top_week_6"
    ],
    "title": "Reorganize String",
    "slug": "reorganize-string",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/reorganize-string/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 67
  },
  {
    "id": "tsk_seat-reservation-manager",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_6",
    "topic_ids": [
      "top_week_6"
    ],
    "title": "Seat Reservation Manager",
    "slug": "seat-reservation-manager",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/seat-reservation-manager/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 68
  },
  {
    "id": "tsk_find-median-from-data-stream",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_6",
    "topic_ids": [
      "top_week_6"
    ],
    "title": "Find Median from Data Stream",
    "slug": "find-median-from-data-stream",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/find-median-from-data-stream/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 69
  },
  {
    "id": "tsk_ipo",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_6",
    "topic_ids": [
      "top_week_6"
    ],
    "title": "IPO",
    "slug": "ipo",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/ipo/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 70
  },
  {
    "id": "tsk_implement-trie-prefix-tree",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_7",
    "topic_ids": [
      "top_week_7"
    ],
    "title": "Implement Trie (Prefix Tree)",
    "slug": "implement-trie-prefix-tree",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/implement-trie-prefix-tree/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 71
  },
  {
    "id": "tsk_subsets",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_7",
    "topic_ids": [
      "top_week_7"
    ],
    "title": "Subsets",
    "slug": "subsets",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/subsets/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 72
  },
  {
    "id": "tsk_combination-sum",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_7",
    "topic_ids": [
      "top_week_7"
    ],
    "title": "Combination Sum",
    "slug": "combination-sum",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/combination-sum/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 73
  },
  {
    "id": "tsk_permutations",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_7",
    "topic_ids": [
      "top_week_7"
    ],
    "title": "Permutations",
    "slug": "permutations",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/permutations/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 74
  },
  {
    "id": "tsk_subsets-ii",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_7",
    "topic_ids": [
      "top_week_7"
    ],
    "title": "Subsets II",
    "slug": "subsets-ii",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/subsets-ii/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 75
  },
  {
    "id": "tsk_combination-sum-ii",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_7",
    "topic_ids": [
      "top_week_7"
    ],
    "title": "Combination Sum II",
    "slug": "combination-sum-ii",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/combination-sum-ii/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 76
  },
  {
    "id": "tsk_word-search",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_7",
    "topic_ids": [
      "top_week_7"
    ],
    "title": "Word Search",
    "slug": "word-search",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/word-search/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 77
  },
  {
    "id": "tsk_palindrome-partitioning",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_7",
    "topic_ids": [
      "top_week_7"
    ],
    "title": "Palindrome Partitioning",
    "slug": "palindrome-partitioning",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/palindrome-partitioning/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 78
  },
  {
    "id": "tsk_letter-combinations-of-a-phone-number",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_7",
    "topic_ids": [
      "top_week_7"
    ],
    "title": "Letter Combinations of a Phone Number",
    "slug": "letter-combinations-of-a-phone-number",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 79
  },
  {
    "id": "tsk_design-add-and-search-words-data-structure",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_7",
    "topic_ids": [
      "top_week_7"
    ],
    "title": "Design Add and Search Words Data Structure",
    "slug": "design-add-and-search-words-data-structure",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 80
  },
  {
    "id": "tsk_n-queens",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_7",
    "topic_ids": [
      "top_week_7"
    ],
    "title": "N-Queens",
    "slug": "n-queens",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/n-queens/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 81
  },
  {
    "id": "tsk_word-search-ii",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_7",
    "topic_ids": [
      "top_week_7"
    ],
    "title": "Word Search II",
    "slug": "word-search-ii",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/word-search-ii/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 82
  },
  {
    "id": "tsk_island-perimeter",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_8",
    "topic_ids": [
      "top_week_8"
    ],
    "title": "Island Perimeter",
    "slug": "island-perimeter",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/island-perimeter/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 83
  },
  {
    "id": "tsk_flood-fill",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_8",
    "topic_ids": [
      "top_week_8"
    ],
    "title": "Flood Fill",
    "slug": "flood-fill",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/flood-fill/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 84
  },
  {
    "id": "tsk_number-of-islands",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_8",
    "topic_ids": [
      "top_week_8"
    ],
    "title": "Number of Islands",
    "slug": "number-of-islands",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/number-of-islands/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 85
  },
  {
    "id": "tsk_max-area-of-island",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_8",
    "topic_ids": [
      "top_week_8"
    ],
    "title": "Max Area of Island",
    "slug": "max-area-of-island",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/max-area-of-island/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 86
  },
  {
    "id": "tsk_clone-graph",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_8",
    "topic_ids": [
      "top_week_8"
    ],
    "title": "Clone Graph",
    "slug": "clone-graph",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/clone-graph/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 87
  },
  {
    "id": "tsk_walls-and-gates",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_8",
    "topic_ids": [
      "top_week_8"
    ],
    "title": "Walls and Gates",
    "slug": "walls-and-gates",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/walls-and-gates/",
    "is_paid_only": true,
    "status": "premium",
    "order_index": 88
  },
  {
    "id": "tsk_rotting-oranges",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_8",
    "topic_ids": [
      "top_week_8"
    ],
    "title": "Rotting Oranges",
    "slug": "rotting-oranges",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/rotting-oranges/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 89
  },
  {
    "id": "tsk_pacific-atlantic-water-flow",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_8",
    "topic_ids": [
      "top_week_8"
    ],
    "title": "Pacific Atlantic Water Flow",
    "slug": "pacific-atlantic-water-flow",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/pacific-atlantic-water-flow/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 90
  },
  {
    "id": "tsk_surrounded-regions",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_8",
    "topic_ids": [
      "top_week_8"
    ],
    "title": "Surrounded Regions",
    "slug": "surrounded-regions",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/surrounded-regions/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 91
  },
  {
    "id": "tsk_word-ladder",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_8",
    "topic_ids": [
      "top_week_8"
    ],
    "title": "Word Ladder",
    "slug": "word-ladder",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/word-ladder/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 92
  },
  {
    "id": "tsk_find-the-town-judge",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_9",
    "topic_ids": [
      "top_week_9"
    ],
    "title": "Find the Town Judge",
    "slug": "find-the-town-judge",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/find-the-town-judge/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 93
  },
  {
    "id": "tsk_course-schedule",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_9",
    "topic_ids": [
      "top_week_9"
    ],
    "title": "Course Schedule",
    "slug": "course-schedule",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/course-schedule/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 94
  },
  {
    "id": "tsk_course-schedule-ii",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_9",
    "topic_ids": [
      "top_week_9"
    ],
    "title": "Course Schedule II",
    "slug": "course-schedule-ii",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/course-schedule-ii/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 95
  },
  {
    "id": "tsk_redundant-connection",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_9",
    "topic_ids": [
      "top_week_9"
    ],
    "title": "Redundant Connection",
    "slug": "redundant-connection",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/redundant-connection/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 96
  },
  {
    "id": "tsk_number-of-connected-components-in-an-undirected-graph",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_9",
    "topic_ids": [
      "top_week_9"
    ],
    "title": "Number of Connected Components in an Undirected Graph",
    "slug": "number-of-connected-components-in-an-undirected-graph",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
    "is_paid_only": true,
    "status": "premium",
    "order_index": 97
  },
  {
    "id": "tsk_graph-valid-tree",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_9",
    "topic_ids": [
      "top_week_9"
    ],
    "title": "Graph Valid Tree",
    "slug": "graph-valid-tree",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/graph-valid-tree/",
    "is_paid_only": true,
    "status": "premium",
    "order_index": 98
  },
  {
    "id": "tsk_network-delay-time",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_9",
    "topic_ids": [
      "top_week_9"
    ],
    "title": "Network Delay Time",
    "slug": "network-delay-time",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/network-delay-time/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 99
  },
  {
    "id": "tsk_alien-dictionary",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_9",
    "topic_ids": [
      "top_week_9"
    ],
    "title": "Alien Dictionary",
    "slug": "alien-dictionary",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/alien-dictionary/",
    "is_paid_only": true,
    "status": "premium",
    "order_index": 100
  },
  {
    "id": "tsk_cheapest-flights-within-k-stops",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_9",
    "topic_ids": [
      "top_week_9"
    ],
    "title": "Cheapest Flights Within K Stops",
    "slug": "cheapest-flights-within-k-stops",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 101
  },
  {
    "id": "tsk_reconstruct-itinerary",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_9",
    "topic_ids": [
      "top_week_9"
    ],
    "title": "Reconstruct Itinerary",
    "slug": "reconstruct-itinerary",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/reconstruct-itinerary/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 102
  },
  {
    "id": "tsk_climbing-stairs",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_10",
    "topic_ids": [
      "top_week_10"
    ],
    "title": "Climbing Stairs",
    "slug": "climbing-stairs",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/climbing-stairs/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 103
  },
  {
    "id": "tsk_min-cost-climbing-stairs",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_10",
    "topic_ids": [
      "top_week_10"
    ],
    "title": "Min Cost Climbing Stairs",
    "slug": "min-cost-climbing-stairs",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/min-cost-climbing-stairs/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 104
  },
  {
    "id": "tsk_house-robber",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_10",
    "topic_ids": [
      "top_week_10"
    ],
    "title": "House Robber",
    "slug": "house-robber",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/house-robber/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 105
  },
  {
    "id": "tsk_house-robber-ii",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_10",
    "topic_ids": [
      "top_week_10"
    ],
    "title": "House Robber II",
    "slug": "house-robber-ii",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/house-robber-ii/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 106
  },
  {
    "id": "tsk_longest-palindromic-substring",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_10",
    "topic_ids": [
      "top_week_10"
    ],
    "title": "Longest Palindromic Substring",
    "slug": "longest-palindromic-substring",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/longest-palindromic-substring/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 107
  },
  {
    "id": "tsk_palindromic-substrings",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_10",
    "topic_ids": [
      "top_week_10"
    ],
    "title": "Palindromic Substrings",
    "slug": "palindromic-substrings",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/palindromic-substrings/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 108
  },
  {
    "id": "tsk_decode-ways",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_10",
    "topic_ids": [
      "top_week_10"
    ],
    "title": "Decode Ways",
    "slug": "decode-ways",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/decode-ways/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 109
  },
  {
    "id": "tsk_coin-change",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_10",
    "topic_ids": [
      "top_week_10"
    ],
    "title": "Coin Change",
    "slug": "coin-change",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/coin-change/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 110
  },
  {
    "id": "tsk_maximum-product-subarray",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_10",
    "topic_ids": [
      "top_week_10"
    ],
    "title": "Maximum Product Subarray",
    "slug": "maximum-product-subarray",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/maximum-product-subarray/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 111
  },
  {
    "id": "tsk_word-break",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_10",
    "topic_ids": [
      "top_week_10"
    ],
    "title": "Word Break",
    "slug": "word-break",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/word-break/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 112
  },
  {
    "id": "tsk_longest-increasing-subsequence",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_10",
    "topic_ids": [
      "top_week_10"
    ],
    "title": "Longest Increasing Subsequence",
    "slug": "longest-increasing-subsequence",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/longest-increasing-subsequence/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 113
  },
  {
    "id": "tsk_partition-equal-subset-sum",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_10",
    "topic_ids": [
      "top_week_10"
    ],
    "title": "Partition Equal Subset Sum",
    "slug": "partition-equal-subset-sum",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/partition-equal-subset-sum/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 114
  },
  {
    "id": "tsk_pascals-triangle",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_11",
    "topic_ids": [
      "top_week_11"
    ],
    "title": "Pascal's Triangle",
    "slug": "pascals-triangle",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/pascals-triangle/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 115
  },
  {
    "id": "tsk_unique-paths",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_11",
    "topic_ids": [
      "top_week_11"
    ],
    "title": "Unique Paths",
    "slug": "unique-paths",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/unique-paths/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 116
  },
  {
    "id": "tsk_longest-common-subsequence",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_11",
    "topic_ids": [
      "top_week_11"
    ],
    "title": "Longest Common Subsequence",
    "slug": "longest-common-subsequence",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/longest-common-subsequence/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 117
  },
  {
    "id": "tsk_best-time-to-buy-and-sell-stock-with-cooldown",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_11",
    "topic_ids": [
      "top_week_11"
    ],
    "title": "Best Time to Buy and Sell Stock with Cooldown",
    "slug": "best-time-to-buy-and-sell-stock-with-cooldown",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 118
  },
  {
    "id": "tsk_coin-change-ii",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_11",
    "topic_ids": [
      "top_week_11"
    ],
    "title": "Coin Change II",
    "slug": "coin-change-ii",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/coin-change-ii/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 119
  },
  {
    "id": "tsk_target-sum",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_11",
    "topic_ids": [
      "top_week_11"
    ],
    "title": "Target Sum",
    "slug": "target-sum",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/target-sum/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 120
  },
  {
    "id": "tsk_interleaving-string",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_11",
    "topic_ids": [
      "top_week_11"
    ],
    "title": "Interleaving String",
    "slug": "interleaving-string",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/interleaving-string/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 121
  },
  {
    "id": "tsk_longest-increasing-path-in-a-matrix",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_11",
    "topic_ids": [
      "top_week_11"
    ],
    "title": "Longest Increasing Path in a Matrix",
    "slug": "longest-increasing-path-in-a-matrix",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 122
  },
  {
    "id": "tsk_distinct-subsequences",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_11",
    "topic_ids": [
      "top_week_11"
    ],
    "title": "Distinct Subsequences",
    "slug": "distinct-subsequences",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/distinct-subsequences/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 123
  },
  {
    "id": "tsk_edit-distance",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_11",
    "topic_ids": [
      "top_week_11"
    ],
    "title": "Edit Distance",
    "slug": "edit-distance",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/edit-distance/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 124
  },
  {
    "id": "tsk_burst-balloons",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_11",
    "topic_ids": [
      "top_week_11"
    ],
    "title": "Burst Balloons",
    "slug": "burst-balloons",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/burst-balloons/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 125
  },
  {
    "id": "tsk_regular-expression-matching",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_11",
    "topic_ids": [
      "top_week_11"
    ],
    "title": "Regular Expression Matching",
    "slug": "regular-expression-matching",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/regular-expression-matching/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 126
  },
  {
    "id": "tsk_single-number",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_12",
    "topic_ids": [
      "top_week_12"
    ],
    "title": "Single Number",
    "slug": "single-number",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/single-number/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 127
  },
  {
    "id": "tsk_number-of-1-bits",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_12",
    "topic_ids": [
      "top_week_12"
    ],
    "title": "Number of 1 Bits",
    "slug": "number-of-1-bits",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/number-of-1-bits/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 128
  },
  {
    "id": "tsk_counting-bits",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_12",
    "topic_ids": [
      "top_week_12"
    ],
    "title": "Counting Bits",
    "slug": "counting-bits",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/counting-bits/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 129
  },
  {
    "id": "tsk_reverse-bits",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_12",
    "topic_ids": [
      "top_week_12"
    ],
    "title": "Reverse Bits",
    "slug": "reverse-bits",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/reverse-bits/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 130
  },
  {
    "id": "tsk_missing-number",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_12",
    "topic_ids": [
      "top_week_12"
    ],
    "title": "Missing Number",
    "slug": "missing-number",
    "difficulty": "Easy",
    "url": "https://leetcode.com/problems/missing-number/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 131
  },
  {
    "id": "tsk_maximum-subarray",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_12",
    "topic_ids": [
      "top_week_12"
    ],
    "title": "Maximum Subarray",
    "slug": "maximum-subarray",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/maximum-subarray/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 132
  },
  {
    "id": "tsk_jump-game",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_12",
    "topic_ids": [
      "top_week_12"
    ],
    "title": "Jump Game",
    "slug": "jump-game",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/jump-game/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 133
  },
  {
    "id": "tsk_jump-game-ii",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_12",
    "topic_ids": [
      "top_week_12"
    ],
    "title": "Jump Game II",
    "slug": "jump-game-ii",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/jump-game-ii/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 134
  },
  {
    "id": "tsk_gas-station",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_12",
    "topic_ids": [
      "top_week_12"
    ],
    "title": "Gas Station",
    "slug": "gas-station",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/gas-station/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 135
  },
  {
    "id": "tsk_hand-of-straights",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_12",
    "topic_ids": [
      "top_week_12"
    ],
    "title": "Hand of Straights",
    "slug": "hand-of-straights",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/hand-of-straights/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 136
  },
  {
    "id": "tsk_insert-interval",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_12",
    "topic_ids": [
      "top_week_12"
    ],
    "title": "Insert Interval",
    "slug": "insert-interval",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/insert-interval/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 137
  },
  {
    "id": "tsk_merge-intervals",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_12",
    "topic_ids": [
      "top_week_12"
    ],
    "title": "Merge Intervals",
    "slug": "merge-intervals",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/merge-intervals/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 138
  },
  {
    "id": "tsk_non-overlapping-intervals",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_12",
    "topic_ids": [
      "top_week_12"
    ],
    "title": "Non-overlapping Intervals",
    "slug": "non-overlapping-intervals",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/non-overlapping-intervals/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 139
  },
  {
    "id": "tsk_minimum-number-of-arrows-to-burst-balloons",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_12",
    "topic_ids": [
      "top_week_12"
    ],
    "title": "Minimum Number of Arrows to Burst Balloons",
    "slug": "minimum-number-of-arrows-to-burst-balloons",
    "difficulty": "Hard",
    "url": "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/",
    "is_paid_only": false,
    "status": "resolved",
    "order_index": 140
  },
  {
    "id": "tsk_meeting-rooms-ii",
    "checklist_id": "chk_seed_12week",
    "topic_id": "top_week_12",
    "topic_ids": [
      "top_week_12"
    ],
    "title": "Meeting Rooms II",
    "slug": "meeting-rooms-ii",
    "difficulty": "Medium",
    "url": "https://leetcode.com/problems/meeting-rooms-ii/",
    "is_paid_only": true,
    "status": "premium",
    "order_index": 141
  }
];
