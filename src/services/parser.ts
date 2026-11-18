// Deterministic Ingestion Parser & Merging Engine
import { Checklist, Topic, Task, Difficulty, TaskStatus } from '../db/types';
import {
  normalizeTopicName,
  areTopicsEquivalent,
  normalizeProblemTitle,
  titleToSlug,
  extractSlugFromUrl,
} from './normalizer';

// Load pre-resolved problems cache
// In React Native / Metro, we can require JSON directly
let cachedProblems: Record<string, any> = {};
try {
  cachedProblems = require('../../seed/problems.json');
} catch {
  cachedProblems = {};
}

export interface ParsedScheduleTopic {
  weekNumber: number;
  topicName: string;
  items: {
    title: string;
    difficulty: Difficulty;
    isDoneInitially: boolean;
  }[];
}

export interface ParsedLearningTopic {
  topicNumber: number;
  topicName: string;
  concepts: string[];
  problems: {
    title: string;
    url: string;
    slug: string;
  }[];
}

export interface ParseResult {
  checklist: Checklist;
  topics: Topic[];
  tasks: Task[];
  warnings: string[];
}

/**
 * Parses File A ("12-Week DSA Checklist")
 */
export function parseScheduleFile(fileAContent: string): ParsedScheduleTopic[] {
  const lines = fileAContent.split(/\r?\n/);
  const result: ParsedScheduleTopic[] = [];

  let currentTopic: ParsedScheduleTopic | null = null;
  let currentDifficulty: Difficulty = 'Easy';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check Week Topic header: "## Week {n}: {Topic}"
    const weekMatch = line.match(/^##\s*Week\s*(\d+)[:.-]?\s*(.+)$/i);
    if (weekMatch) {
      if (currentTopic) {
        result.push(currentTopic);
      }
      currentTopic = {
        weekNumber: parseInt(weekMatch[1], 10),
        topicName: weekMatch[2].trim(),
        items: [],
      };
      currentDifficulty = 'Easy';
      continue;
    }

    // Check Difficulty subheader: "### Easy | Medium | Hard"
    if (line.startsWith('###')) {
      const heading = line.replace(/^###\s*/, '').toLowerCase();
      if (heading.includes('easy')) {
        currentDifficulty = 'Easy';
      } else if (heading.includes('medium')) {
        currentDifficulty = 'Medium';
      } else if (heading.includes('hard')) {
        currentDifficulty = 'Hard';
      }
      continue;
    }

    // Check Task line: "- [ ]  {Title}" or "- [x] {Title}"
    const taskMatch = line.match(/^-\s*\[([ xX])\]\s+(.+)$/);
    if (taskMatch && currentTopic) {
      const isDone = taskMatch[1].toLowerCase() === 'x';
      const title = taskMatch[2].trim();
      currentTopic.items.push({
        title,
        difficulty: currentDifficulty,
        isDoneInitially: isDone,
      });
      continue;
    }

    // Separators "---" are simply skipped
  }

  if (currentTopic) {
    result.push(currentTopic);
  }

  return result;
}

/**
 * Parses File B ("DSA Topics, Patterns, and LeetCode Questions")
 */
export function parseLearningFile(fileBContent: string): ParsedLearningTopic[] {
  const lines = fileBContent.split(/\r?\n/);
  const result: ParsedLearningTopic[] = [];

  let currentTopic: ParsedLearningTopic | null = null;
  let inSubtopics = false;
  let inLeetCode = false;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // Match "## {n}. {Topic}"
    const topicMatch = line.match(/^##\s*(\d+)[\.\)]?\s*(.+)$/);
    if (topicMatch) {
      if (currentTopic) {
        result.push(currentTopic);
      }
      currentTopic = {
        topicNumber: parseInt(topicMatch[1], 10),
        topicName: topicMatch[2].trim(),
        concepts: [],
        problems: [],
      };
      inSubtopics = false;
      inLeetCode = false;
      continue;
    }

    if (line.match(/^###\s*Subtopics/i)) {
      inSubtopics = true;
      inLeetCode = false;
      continue;
    }

    if (line.match(/^###\s*LeetCode/i)) {
      inSubtopics = false;
      inLeetCode = true;
      continue;
    }

    if (inSubtopics && currentTopic) {
      if (line.startsWith('-') || line.startsWith('*')) {
        const concept = line.replace(/^[-*]\s*/, '').trim();
        if (concept) {
          currentTopic.concepts.push(concept);
        }
      }
      continue;
    }

    if (inLeetCode && currentTopic) {
      const stripped = line.replace(/^[-*]\s*/, '').trim();
      if (stripped.startsWith('http://') || stripped.startsWith('https://')) {
        continue;
      }

      const probTitle = stripped;
      let url = '';

      // Check if next line is indented URL
      if (i + 1 < lines.length) {
        const nextStripped = lines[i + 1].trim().replace(/^[-*]\s*/, '').trim();
        if (nextStripped.startsWith('http://') || nextStripped.startsWith('https://')) {
          url = nextStripped;
          i++; // consume URL line
        }
      }

      const slug = extractSlugFromUrl(url) || titleToSlug(probTitle);
      currentTopic.problems.push({
        title: probTitle,
        url,
        slug,
      });
    }
  }

  if (currentTopic) {
    result.push(currentTopic);
  }

  return result;
}

/**
 * Merges File A and File B according to strict rules
 */
export function mergeCurriculumFiles(
  fileAContent: string,
  fileBContent: string,
  sourceType: 'notion' | 'markdown' | 'csv' | 'pasted' | 'default' = 'markdown'
): ParseResult {
  const warnings: string[] = [];
  const scheduleTopics = parseScheduleFile(fileAContent);
  const learningTopics = parseLearningFile(fileBContent);

  const checklist: Checklist = {
    id: `chk_${Date.now()}`,
    title: '12-Week Structured DSA Journey',
    source_type: sourceType,
    created_at: new Date().toISOString(),
  };

  const finalTopics: Topic[] = [];
  const taskMapBySlug = new Map<string, Task>();
  let taskOrderIndex = 0;

  // Process each schedule topic
  for (const sTopic of scheduleTopics) {
    // 1. Join A and B by topic name (case-insensitive, "and" = "&")
    const lTopic = learningTopics.find(
      (lt) =>
        areTopicsEquivalent(lt.topicName, sTopic.topicName) ||
        lt.topicNumber === sTopic.weekNumber
    );

    if (lTopic && lTopic.topicNumber !== sTopic.weekNumber) {
      warnings.push(
        `Week ${sTopic.weekNumber} (${sTopic.topicName}) matched with Topic ${lTopic.topicNumber} (${lTopic.topicName}) by name.`
      );
    }

    const topicId = `top_week_${sTopic.weekNumber}`;
    const concepts = lTopic ? lTopic.concepts : [];

    finalTopics.push({
      id: topicId,
      checklist_id: checklist.id,
      week_number: sTopic.weekNumber,
      topic_number: sTopic.weekNumber,
      title: sTopic.topicName,
      concepts,
      order_index: sTopic.weekNumber - 1,
    });

    // Match tasks in schedule to learning links
    for (const item of sTopic.items) {
      const normalizedItemTitle = normalizeProblemTitle(item.title);
      let matchedProb = lTopic?.problems.find(
        (p) => normalizeProblemTitle(p.title) === normalizedItemTitle
      );

      // If not matched by title in same topic, search across all learning topics by title
      if (!matchedProb) {
        for (const otherLt of learningTopics) {
          const match = otherLt.problems.find(
            (p) => normalizeProblemTitle(p.title) === normalizedItemTitle
          );
          if (match) {
            matchedProb = match;
            break;
          }
        }
      }

      // Generate canonical slug
      const slug = matchedProb?.slug || titleToSlug(item.title);
      const preResolved = cachedProblems[slug];

      let url = matchedProb?.url || '';
      let status: TaskStatus = 'resolved';

      if (!url) {
        if (preResolved) {
          url = `https://leetcode.com/problems/${slug}/`;
        } else {
          status = 'needs_link';
          warnings.push(`Problem "${item.title}" in Week ${sTopic.weekNumber} needs link verification.`);
        }
      }

      const isPaidOnly = Boolean(preResolved?.isPaidOnly);
      if (isPaidOnly) {
        status = 'premium';
      }

      // De-duplicate by slug: if already exists, attach this topicId to its topic_ids
      if (taskMapBySlug.has(slug)) {
        const existingTask = taskMapBySlug.get(slug)!;
        if (!existingTask.topic_ids.includes(topicId)) {
          existingTask.topic_ids.push(topicId);
        }
      } else {
        const task: Task = {
          id: `tsk_${slug}`,
          checklist_id: checklist.id,
          topic_id: topicId,
          topic_ids: [topicId],
          title: preResolved?.title || item.title,
          slug,
          difficulty: item.difficulty, // trust checklist difficulty
          url,
          is_paid_only: isPaidOnly,
          status,
          order_index: taskOrderIndex++,
        };
        taskMapBySlug.set(slug, task);
      }
    }

    // 4. Problems in File B but not in File A: import as "Bonus practice"
    if (lTopic) {
      for (const bProb of lTopic.problems) {
        const bSlug = bProb.slug || titleToSlug(bProb.title);
        if (!taskMapBySlug.has(bSlug)) {
          const preResolved = cachedProblems[bSlug];
          const isPaidOnly = Boolean(preResolved?.isPaidOnly);

          const bonusTask: Task = {
            id: `tsk_${bSlug}`,
            checklist_id: checklist.id,
            topic_id: topicId,
            topic_ids: [topicId],
            title: preResolved?.title || bProb.title,
            slug: bSlug,
            difficulty: (preResolved?.difficulty as Difficulty) || 'Medium',
            url: bProb.url || `https://leetcode.com/problems/${bSlug}/`,
            is_paid_only: isPaidOnly,
            status: isPaidOnly ? 'premium' : 'bonus',
            order_index: taskOrderIndex++,
          };
          taskMapBySlug.set(bSlug, bonusTask);
        }
      }
    }
  }

  const finalTasks = Array.from(taskMapBySlug.values());

  return {
    checklist,
    topics: finalTopics,
    tasks: finalTasks,
    warnings,
  };
}
