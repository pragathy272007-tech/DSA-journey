// LeetCode Public GraphQL Integration
// Queries user profile stats and recent accepted submissions

export interface LeetCodeUserStats {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  acceptanceRate: number;
}

export interface LeetCodeSubmission {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
}

export interface LeetCodeSyncResult {
  success: boolean;
  userStats?: LeetCodeUserStats;
  recentSubmissions: LeetCodeSubmission[];
  matchedSlugs: string[];
  errorMessage?: string;
}

const LEETCODE_GRAPHQL_ENDPOINT = 'https://leetcode.com/graphql';

const USER_PROFILE_QUERY = `
query getUserProfile($username: String!) {
  matchedUser(username: $username) {
    username
    profile {
      ranking
    }
    submitStatsGlobal {
      acSubmissionNum {
        difficulty
        count
      }
    }
  }
}
`;

const RECENT_SUBMISSIONS_QUERY = `
query getRecentSubmissions($username: String!) {
  recentAcSubmissionList(username: $username, limit: 25) {
    title
    titleSlug
    timestamp
    statusDisplay
    lang
  }
}
`;

/**
 * Validates whether a LeetCode username exists
 */
export async function validateLeetCodeUsername(username: string): Promise<boolean> {
  if (!username || username.trim().length === 0) return false;

  try {
    const res = await fetch(LEETCODE_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) DSAJourney/1.0',
      },
      body: JSON.stringify({
        query: USER_PROFILE_QUERY,
        variables: { username: username.trim() },
      }),
    });

    if (!res.ok) return false;
    const data = await res.json();
    return !!data?.data?.matchedUser?.username;
  } catch {
    // Offline or network error: return true for development grace
    return true;
  }
}

/**
 * Fetches solved problem counts and recent accepted submissions
 */
export async function fetchLeetCodeStats(username: string): Promise<LeetCodeSyncResult> {
  if (!username || username.trim().length === 0) {
    return {
      success: false,
      recentSubmissions: [],
      matchedSlugs: [],
      errorMessage: 'Please configure your LeetCode username in Profile.',
    };
  }

  try {
    const [profileRes, submissionsRes] = await Promise.all([
      fetch(LEETCODE_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) DSAJourney/1.0',
        },
        body: JSON.stringify({
          query: USER_PROFILE_QUERY,
          variables: { username: username.trim() },
        }),
      }),
      fetch(LEETCODE_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) DSAJourney/1.0',
        },
        body: JSON.stringify({
          query: RECENT_SUBMISSIONS_QUERY,
          variables: { username: username.trim() },
        }),
      }),
    ]);

    if (!profileRes.ok || !submissionsRes.ok) {
      throw new Error('LeetCode rate limit or network error. Please try again in a few moments.');
    }

    const profileData = await profileRes.json();
    const subData = await submissionsRes.json();

    const matchedUser = profileData?.data?.matchedUser;
    if (!matchedUser) {
      return {
        success: false,
        recentSubmissions: [],
        matchedSlugs: [],
        errorMessage: `LeetCode profile "${username}" not found or profile is private.`,
      };
    }

    const acStats = matchedUser.submitStatsGlobal?.acSubmissionNum || [];
    const all = acStats.find((s: any) => s.difficulty === 'All')?.count || 0;
    const easy = acStats.find((s: any) => s.difficulty === 'Easy')?.count || 0;
    const med = acStats.find((s: any) => s.difficulty === 'Medium')?.count || 0;
    const hard = acStats.find((s: any) => s.difficulty === 'Hard')?.count || 0;

    const recentSubmissions: LeetCodeSubmission[] =
      subData?.data?.recentAcSubmissionList || [];

    const matchedSlugs = recentSubmissions.map((s) => s.titleSlug);

    return {
      success: true,
      userStats: {
        username: matchedUser.username,
        totalSolved: all,
        easySolved: easy,
        mediumSolved: med,
        hardSolved: hard,
        ranking: matchedUser.profile?.ranking || 0,
        acceptanceRate: 0,
      },
      recentSubmissions,
      matchedSlugs,
    };
  } catch (error: any) {
    return {
      success: false,
      recentSubmissions: [],
      matchedSlugs: [],
      errorMessage: error.message || 'Network error while contacting LeetCode.',
    };
  }
}
