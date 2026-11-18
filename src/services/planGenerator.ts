// Adaptive Study Plan Generator
import { Checklist, Topic, Task, StudyPlan, PlanDay, Difficulty } from '../db/types';
import { addDays, format, getDay } from 'date-fns';

export interface PlanGenerationOptions {
  startDate?: Date;
  totalWeeks?: number;
  dailyStudyMinutes?: number;
  restDayOfWeek?: number; // 0 = Sunday (default)
}

export function estimateTaskMinutes(difficulty: Difficulty): number {
  switch (difficulty) {
    case 'Easy':
      return 20;
    case 'Medium':
      return 35;
    case 'Hard':
      return 60;
  }
}

/**
 * Generates structured 12-week schedule with 6 study days + 1 weekly review day per week.
 */
export function generateStudyPlan(
  checklist: Checklist,
  topics: Topic[],
  tasks: Task[],
  options: PlanGenerationOptions = {}
): { studyPlan: StudyPlan; planDays: PlanDay[] } {
  const startDate = options.startDate || new Date();
  const totalWeeks = options.totalWeeks || 12;
  const dailyStudyMinutes = options.dailyStudyMinutes || 60;
  const restDayOfWeek = options.restDayOfWeek !== undefined ? options.restDayOfWeek : 0; // Sunday

  const studyPlan: StudyPlan = {
    id: `plan_${Date.now()}`,
    checklist_id: checklist.id,
    start_date: format(startDate, 'yyyy-MM-dd'),
    total_weeks: totalWeeks,
    daily_study_minutes: dailyStudyMinutes,
    is_active: true,
  };

  const planDays: PlanDay[] = [];
  let dayCounter = 1;
  let currentDate = startDate;

  // Process week by week
  for (let weekIdx = 0; weekIdx < totalWeeks; weekIdx++) {
    const weekNumber = weekIdx + 1;
    // Map week to topic
    const topic = topics.find((t) => t.week_number === weekNumber) || topics[weekIdx % topics.length];

    // Filter tasks for this topic (exclude bonus tasks from initial schedule)
    const topicTasks = tasks.filter(
      (t) => t.topic_ids.includes(topic?.id || '') && t.status !== 'bonus'
    );

    // Sort: Easy first, Mediums middle, Hard last
    const difficultyWeight: Record<Difficulty, number> = {
      Easy: 1,
      Medium: 2,
      Hard: 3,
    };
    const sortedTasks = [...topicTasks].sort(
      (a, b) => difficultyWeight[a.difficulty] - difficultyWeight[b.difficulty]
    );

    // Distribute sorted tasks across 6 study days
    // Days 1 & 2 carry concepts/video (+20 min)
    const studyDayBuckets: Task[][] = [[], [], [], [], [], []];

    // Distribute tasks: Easies go to days 0-1, Mediums days 1-3, Hards days 4-5
    const easies = sortedTasks.filter((t) => t.difficulty === 'Easy');
    const mediums = sortedTasks.filter((t) => t.difficulty === 'Medium');
    const hards = sortedTasks.filter((t) => t.difficulty === 'Hard');

    // Place easies in early days
    easies.forEach((t, i) => {
      const bucketIdx = i % 2; // day 0 or 1
      studyDayBuckets[bucketIdx].push(t);
    });

    // Place mediums across days 1 to 4
    mediums.forEach((t, i) => {
      const bucketIdx = 1 + (i % 4); // days 1, 2, 3, 4
      studyDayBuckets[bucketIdx].push(t);
    });

    // Place hards in days 4 and 5 (max 1 hard per day whenever possible)
    hards.forEach((t, i) => {
      const bucketIdx = 4 + (i % 2); // days 4 or 5
      studyDayBuckets[bucketIdx].push(t);
    });

    // Generate 7 days for this week (6 study days + 1 review day)
    for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
      const isReviewDay = dayOfWeek === 6; // 7th day is Sunday review
      const calendarDateStr = format(currentDate, 'yyyy-MM-dd');
      const dayTasks = isReviewDay ? [] : studyDayBuckets[dayOfWeek] || [];

      // Calculate estimated time
      let estimatedMinutes = 0;
      if (!isReviewDay) {
        // Concept / Video time on days 0 and 1
        if (dayOfWeek <= 1) {
          estimatedMinutes += 20;
        }
        for (const t of dayTasks) {
          estimatedMinutes += estimateTaskMinutes(t.difficulty);
        }
      } else {
        estimatedMinutes = 60; // Sunday revision session block
      }

      const planDay: PlanDay = {
        id: `day_${dayCounter}`,
        plan_id: studyPlan.id,
        day_number: dayCounter,
        week_number: weekNumber,
        calendar_date: calendarDateStr,
        is_rest_day: isReviewDay,
        is_weekly_review_day: isReviewDay,
        topic_id: topic?.id,
        estimated_minutes: estimatedMinutes,
        tasks: dayTasks,
      };

      planDays.push(planDay);
      dayCounter++;
      currentDate = addDays(currentDate, 1);
    }
  }

  return { studyPlan, planDays };
}
