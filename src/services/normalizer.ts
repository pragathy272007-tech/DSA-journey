// Normalizer Utilities for Topics, Titles, and Slugs

/**
 * Normalizes topic names to allow case-insensitive matching and equivalence of "and" with "&"
 * e.g., "Arrays and Hashing" matches "Arrays & Hashing"
 */
export function normalizeTopicName(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Checks if two topic strings are equivalent
 */
export function areTopicsEquivalent(topicA: string, topicB: string): boolean {
  return normalizeTopicName(topicA) === normalizeTopicName(topicB);
}

/**
 * Normalizes problem title for reliable fuzzy matching
 * e.g., "Two Sum II - Input Array Is Sorted" -> "two sum ii input array is sorted"
 */
export function normalizeProblemTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Generates canonical LeetCode slug from problem title
 * e.g., "Binary Tree Level Order Traversal" -> "binary-tree-level-order-traversal"
 */
export function titleToSlug(title: string): string {
  // Known special mappings where slug differs notably from title
  const specialSlugs: Record<string, string> = {
    'implement trie': 'implement-trie-prefix-tree',
    'implement trie prefix tree': 'implement-trie-prefix-tree',
    'encode and decode strings': 'encode-and-decode-strings',
    'two sum ii input array is sorted': 'two-sum-ii-input-array-is-sorted',
    'kth largest element in a stream': 'kth-largest-element-in-a-stream',
    'design add and search words data structure': 'design-add-and-search-words-data-structure',
    'number of 1 bits': 'number-of-1-bits',
    '1 d dynamic programming': '1-d-dynamic-programming',
  };

  const normalized = normalizeProblemTitle(title);
  if (specialSlugs[normalized]) {
    return specialSlugs[normalized];
  }

  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/**
 * Extracts slug from full LeetCode problem URL
 * e.g., "https://leetcode.com/problems/two-sum/" -> "two-sum"
 */
export function extractSlugFromUrl(url: string): string | null {
  try {
    const match = url.match(/leetcode\.com\/problems\/([^/?#]+)/i);
    return match ? match[1].toLowerCase() : null;
  } catch {
    return null;
  }
}
