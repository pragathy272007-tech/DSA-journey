const fs = require('fs');
const path = require('path');

const fileAPath = path.join(__dirname, '..', 'seed', '12-Week-DSA-Checklist.md');
const fileBPath = path.join(__dirname, '..', 'seed', 'DSA-Topics-Patterns-and-LeetCode-Questions.md');

const fileA = fs.readFileSync(fileAPath, 'utf-8');
const fileB = fs.readFileSync(fileBPath, 'utf-8');

function normalizeTopicName(name) {
  return name.toLowerCase().replace(/&/g, 'and').replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
}
function areTopicsEquivalent(a, b) {
  return normalizeTopicName(a) === normalizeTopicName(b);
}
function normalizeProblemTitle(title) {
  return title.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
}
function titleToSlug(title) {
  const special = {
    'implement trie': 'implement-trie-prefix-tree',
    'implement trie prefix tree': 'implement-trie-prefix-tree',
    'encode and decode strings': 'encode-and-decode-strings',
    'two sum ii input array is sorted': 'two-sum-ii-input-array-is-sorted',
    'kth largest element in a stream': 'kth-largest-element-in-a-stream',
    'design add and search words data structure': 'design-add-and-search-words-data-structure',
    'number of 1 bits': 'number-of-1-bits',
  };
  const norm = normalizeProblemTitle(title);
  if (special[norm]) return special[norm];
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}
function extractSlugFromUrl(url) {
  const m = url.match(/leetcode\.com\/problems\/([^/?#]+)/i);
  return m ? m[1].toLowerCase() : null;
}

const problemsCache = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'seed', 'problems.json'), 'utf-8'));

// Parse File A
const sTopics = [];
let curSTopic = null;
let curDiff = 'Easy';
for (const line of fileA.split(/\r?\n/)) {
  const tr = line.trim();
  const wMatch = tr.match(/^##\s*Week\s*(\d+)[:.-]?\s*(.+)$/i);
  if (wMatch) {
    if (curSTopic) sTopics.push(curSTopic);
    curSTopic = { weekNumber: parseInt(wMatch[1], 10), topicName: wMatch[2].trim(), items: [] };
    curDiff = 'Easy';
    continue;
  }
  if (tr.startsWith('###')) {
    const h = tr.replace(/^###\s*/, '').toLowerCase();
    if (h.includes('easy')) curDiff = 'Easy';
    else if (h.includes('medium')) curDiff = 'Medium';
    else if (h.includes('hard')) curDiff = 'Hard';
    continue;
  }
  const tMatch = tr.match(/^-\s*\[([ xX])\]\s+(.+)$/);
  if (tMatch && curSTopic) {
    curSTopic.items.push({ title: tMatch[2].trim(), difficulty: curDiff });
  }
}
if (curSTopic) sTopics.push(curSTopic);

// Parse File B
const lTopics = [];
let curLTopic = null;
let inSub = false, inLC = false;
const bLines = fileB.split(/\r?\n/);
for (let i = 0; i < bLines.length; i++) {
  const tr = bLines[i].trim();
  const tMatch = tr.match(/^##\s*(\d+)[\.\)]?\s*(.+)$/);
  if (tMatch) {
    if (curLTopic) lTopics.push(curLTopic);
    curLTopic = { topicNumber: parseInt(tMatch[1], 10), topicName: tMatch[2].trim(), concepts: [], problems: [] };
    inSub = false; inLC = false;
    continue;
  }
  if (tr.match(/^###\s*Subtopics/i)) { inSub = true; inLC = false; continue; }
  if (tr.match(/^###\s*LeetCode/i)) { inSub = false; inLC = true; continue; }
  if (inSub && curLTopic && (tr.startsWith('-') || tr.startsWith('*'))) {
    curLTopic.concepts.push(tr.replace(/^[-*]\s*/, '').trim());
  }
  if (inLC && curLTopic && (tr.startsWith('-') || tr.startsWith('*'))) {
    const stripped = tr.replace(/^[-*]\s*/, '').trim();
    if (stripped.startsWith('http://') || stripped.startsWith('https://')) {
      continue;
    }

    const pTitle = stripped;
    let url = '';
    if (i + 1 < bLines.length) {
      const nextStripped = bLines[i + 1].trim().replace(/^[-*]\s*/, '').trim();
      if (nextStripped.startsWith('http://') || nextStripped.startsWith('https://')) {
        url = nextStripped;
        i++;
      }
    }
    const slug = extractSlugFromUrl(url) || titleToSlug(pTitle);
    curLTopic.problems.push({ title: pTitle, url, slug });
  }
}
if (curLTopic) lTopics.push(curLTopic);

// Merge
const checklist = {
  id: 'chk_seed_12week',
  title: '12-Week DSA Master Curriculum',
  source_type: 'default',
  created_at: new Date().toISOString(),
};

const topics = [];
const tasksMap = new Map();
let orderIdx = 0;

for (const s of sTopics) {
  const l = lTopics.find(lt => areTopicsEquivalent(lt.topicName, s.topicName) || lt.topicNumber === s.weekNumber);
  const topicId = `top_week_${s.weekNumber}`;
  topics.push({
    id: topicId,
    checklist_id: checklist.id,
    week_number: s.weekNumber,
    topic_number: s.weekNumber,
    title: s.topicName,
    concepts: l ? l.concepts : [],
    order_index: s.weekNumber - 1,
  });

  for (const item of s.items) {
    const norm = normalizeProblemTitle(item.title);
    let matched = l?.problems.find(p => normalizeProblemTitle(p.title) === norm);
    if (!matched) {
      for (const otherL of lTopics) {
        const m = otherL.problems.find(p => normalizeProblemTitle(p.title) === norm);
        if (m) { matched = m; break; }
      }
    }
    const slug = matched?.slug || titleToSlug(item.title);
    const meta = problemsCache[slug];
    const isPaid = Boolean(meta?.isPaidOnly);
    const url = matched?.url || (meta ? `https://leetcode.com/problems/${slug}/` : '');

    if (tasksMap.has(slug)) {
      const existing = tasksMap.get(slug);
      if (!existing.topic_ids.includes(topicId)) existing.topic_ids.push(topicId);
    } else {
      tasksMap.set(slug, {
        id: `tsk_${slug}`,
        checklist_id: checklist.id,
        topic_id: topicId,
        topic_ids: [topicId],
        title: meta?.title || item.title,
        slug,
        difficulty: item.difficulty,
        url,
        is_paid_only: isPaid,
        status: isPaid ? 'premium' : (url ? 'resolved' : 'needs_link'),
        order_index: orderIdx++,
      });
    }
  }

  // Bonus items from File B
  if (l) {
    for (const b of l.problems) {
      const bSlug = b.slug || titleToSlug(b.title);
      if (!tasksMap.has(bSlug)) {
        const meta = problemsCache[bSlug];
        const isPaid = Boolean(meta?.isPaidOnly);
        tasksMap.set(bSlug, {
          id: `tsk_${bSlug}`,
          checklist_id: checklist.id,
          topic_id: topicId,
          topic_ids: [topicId],
          title: meta?.title || b.title,
          slug: bSlug,
          difficulty: meta?.difficulty || 'Medium',
          url: b.url || `https://leetcode.com/problems/${bSlug}/`,
          is_paid_only: isPaid,
          status: isPaid ? 'premium' : 'bonus',
          order_index: orderIdx++,
        });
      }
    }
  }
}

const tasks = Array.from(tasksMap.values());

const outputTS = `// Pre-generated Seed Dataset for DSA Journey
import { Checklist, Topic, Task } from '../db/types';

export const SEED_CHECKLIST: Checklist = ${JSON.stringify(checklist, null, 2)};
export const SEED_TOPICS: Topic[] = ${JSON.stringify(topics, null, 2)};
export const SEED_TASKS: Task[] = ${JSON.stringify(tasks, null, 2)};
`;

const targetPath = path.join(__dirname, '..', 'src', 'fixtures', 'defaultPlan.ts');
fs.mkdirSync(path.dirname(targetPath), { recursive: true });
fs.writeFileSync(targetPath, outputTS, 'utf-8');
console.log(`Generated defaultPlan.ts with ${topics.length} topics and ${tasks.length} total tasks.`);
