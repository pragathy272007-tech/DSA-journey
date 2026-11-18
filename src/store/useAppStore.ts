import { create } from 'zustand';
import {
  UserProfile,
  Checklist,
  Topic,
  Task,
  StudyPlan,
  PlanDay,
  PlanDayTask,
  TaskCompletion,
  RevisionItem,
  Streak,
  NotificationSettings,
  RevisionRating,
} from '../db/types';
import { getDatabase, initDatabase } from '../db/sqlite';
import { calculateNextReview } from '../services/spacedRepetition';
import { cancelEveningReminderIfComplete } from '../services/notifications';
import { format, parseISO, isYesterday, isToday, addDays } from 'date-fns';

interface AppState {
  isInitialized: boolean;
  profile: UserProfile | null;
  checklist: Checklist | null;
  topics: Topic[];
  tasks: Task[];
  studyPlan: StudyPlan | null;
  planDays: PlanDay[];
  completions: Record<string, TaskCompletion>;
  revisionItems: RevisionItem[];
  streak: Streak;
  notificationSettings: NotificationSettings;

  // Actions
  initialize: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  saveCurriculum: (
    checklist: Checklist,
    topics: Topic[],
    tasks: Task[],
    studyPlan: StudyPlan,
    planDays: PlanDay[]
  ) => Promise<void>;
  toggleTaskCompletion: (
    taskId: string,
    planDayId?: string,
    notes?: { approach?: string; complexity?: string; mistakes?: string }
  ) => Promise<void>;
  recordRevision: (taskId: string, rating: RevisionRating) => Promise<void>;
  moveTask: (taskId: string, fromDayId: string, toDayId: string) => Promise<void>;
  rescheduleMissedTasks: () => Promise<{ rescheduledCount: number }>;
  updateTopicVideo: (topicId: string, videoUrl: string) => Promise<void>;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => Promise<void>;
  useStreakFreeze: () => Promise<boolean>;
}

const DEFAULT_STREAK: Streak = {
  id: 'streak_default',
  current_streak: 1,
  longest_streak: 1,
  freezes_available: 1,
  last_active_date: format(new Date(), 'yyyy-MM-dd'),
  freeze_used_this_week: false,
};

const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  id: 'notif_default',
  morning_nudge_enabled: true,
  morning_nudge_time: '08:00',
  evening_reminder_enabled: true,
  evening_reminder_time: '20:00',
  escalation_enabled: true,
  quiet_hours_start: '23:00',
  quiet_hours_end: '07:00',
  snooze_until: null,
};

export const useAppStore = create<AppState>((set, get) => ({
  isInitialized: false,
  profile: null,
  checklist: null,
  topics: [],
  tasks: [],
  studyPlan: null,
  planDays: [],
  completions: {},
  revisionItems: [],
  streak: DEFAULT_STREAK,
  notificationSettings: DEFAULT_NOTIFICATION_SETTINGS,

  initialize: async () => {
    try {
      initDatabase();
      const db = getDatabase();

      // Load Profile
      const profileRow = db.getFirstSync<UserProfile>(
        'SELECT * FROM profiles LIMIT 1'
      );

      // Load Checklist
      const checklistRow = db.getFirstSync<Checklist>(
        'SELECT * FROM checklists LIMIT 1'
      );

      // Load Topics
      const topicRows = db.getAllSync<any>('SELECT * FROM topics ORDER BY order_index ASC');
      const loadedTopics: Topic[] = topicRows.map((t) => ({
        ...t,
        concepts: JSON.parse(t.concepts || '[]'),
      }));

      // Load Tasks
      const taskRows = db.getAllSync<any>('SELECT * FROM tasks ORDER BY order_index ASC');
      const loadedTasks: Task[] = taskRows.map((t) => ({
        ...t,
        topic_ids: JSON.parse(t.topic_ids || '[]'),
        is_paid_only: Boolean(t.is_paid_only),
      }));

      // Load Study Plan
      const planRow = db.getFirstSync<StudyPlan>(
        'SELECT * FROM study_plans WHERE is_active = 1 LIMIT 1'
      );

      // Load Plan Days
      const planDayRows = db.getAllSync<any>(
        'SELECT * FROM plan_days ORDER BY day_number ASC'
      );

      // Load Plan Day Tasks mapping
      const dayTaskRows = db.getAllSync<PlanDayTask>('SELECT * FROM plan_day_tasks ORDER BY order_index ASC');
      const tasksById = new Map(loadedTasks.map((t) => [t.id, t]));

      const loadedPlanDays: PlanDay[] = planDayRows.map((day) => {
        const assignedTaskIds = dayTaskRows
          .filter((dt) => dt.plan_day_id === day.id)
          .map((dt) => dt.task_id);
        const dayTasks = assignedTaskIds
          .map((id) => tasksById.get(id))
          .filter((t): t is Task => !!t);

        return {
          ...day,
          is_rest_day: Boolean(day.is_rest_day),
          is_weekly_review_day: Boolean(day.is_weekly_review_day),
          tasks: dayTasks,
        };
      });

      // Load Completions
      const completionRows = db.getAllSync<TaskCompletion>('SELECT * FROM task_completions');
      const completionMap: Record<string, TaskCompletion> = {};
      completionRows.forEach((c) => {
        completionMap[c.task_id] = c;
      });

      // Load Revision Items
      const revisionRows = db.getAllSync<RevisionItem>(
        'SELECT * FROM revision_items ORDER BY next_due_date ASC'
      );
      const enrichedRevisions: RevisionItem[] = revisionRows.map((r) => ({
        ...r,
        task: tasksById.get(r.task_id),
        completion: completionMap[r.task_id],
      }));

      // Load Streak
      const streakRow = db.getFirstSync<Streak>('SELECT * FROM streaks LIMIT 1');

      // Load Notifications
      const notifRow = db.getFirstSync<NotificationSettings>(
        'SELECT * FROM notification_settings LIMIT 1'
      );

      set({
        isInitialized: true,
        profile: profileRow || null,
        checklist: checklistRow || null,
        topics: loadedTopics,
        tasks: loadedTasks,
        studyPlan: planRow || null,
        planDays: loadedPlanDays,
        completions: completionMap,
        revisionItems: enrichedRevisions,
        streak: streakRow || DEFAULT_STREAK,
        notificationSettings: notifRow || DEFAULT_NOTIFICATION_SETTINGS,
      });
    } catch (e) {
      console.error('Failed to initialize database store:', e);
      set({ isInitialized: true });
    }
  },

  updateProfile: async (updates) => {
    const db = getDatabase();
    const current = get().profile;
    const now = new Date().toISOString();

    const merged: UserProfile = current
      ? { ...current, ...updates }
      : {
          id: 'user_default',
          name: updates.name || 'DSA Learner',
          email: updates.email || 'learner@dsajourney.app',
          preferred_language: updates.preferred_language || 'cpp',
          default_playlist_name: updates.default_playlist_name || 'Striver A2Z Playlist',
          default_playlist_url:
            updates.default_playlist_url ||
            'https://youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_St8',
          reference_website_name: updates.reference_website_name || 'takeuforward.org',
          reference_website_url: updates.reference_website_url || 'https://takeuforward.org',
          study_duration_weeks: updates.study_duration_weeks || 12,
          daily_study_minutes: updates.daily_study_minutes || 60,
          reminder_time: updates.reminder_time || '08:00',
          evening_reminder_time: updates.evening_reminder_time || '20:00',
          created_at: now,
          ...updates,
        };

    db.runSync(
      `INSERT OR REPLACE INTO profiles (
        id, name, email, linkedin_url, leetcode_username, leetcode_verified,
        preferred_language, default_playlist_name, default_playlist_url,
        reference_website_name, reference_website_url, study_duration_weeks,
        daily_study_minutes, reminder_time, evening_reminder_time, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        merged.id,
        merged.name,
        merged.email,
        merged.linkedin_url || null,
        merged.leetcode_username || null,
        merged.leetcode_verified ? 1 : 0,
        merged.preferred_language,
        merged.default_playlist_name,
        merged.default_playlist_url,
        merged.reference_website_name,
        merged.reference_website_url,
        merged.study_duration_weeks,
        merged.daily_study_minutes,
        merged.reminder_time,
        merged.evening_reminder_time,
        merged.created_at,
      ]
    );

    set({ profile: merged });
  },

  saveCurriculum: async (checklist, topics, tasks, studyPlan, planDays) => {
    const db = getDatabase();

    db.withTransactionSync(() => {
      // Clear previous plan data
      db.runSync('DELETE FROM checklists');
      db.runSync('DELETE FROM topics');
      db.runSync('DELETE FROM tasks');
      db.runSync('DELETE FROM study_plans');
      db.runSync('DELETE FROM plan_days');
      db.runSync('DELETE FROM plan_day_tasks');

      // Insert Checklist
      db.runSync(
        'INSERT INTO checklists (id, title, source_type, created_at) VALUES (?, ?, ?, ?)',
        [checklist.id, checklist.title, checklist.source_type, checklist.created_at]
      );

      // Insert Topics
      for (const t of topics) {
        db.runSync(
          `INSERT INTO topics (id, checklist_id, week_number, topic_number, title, concepts, custom_video_url, custom_reference_url, order_index)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            t.id,
            t.checklist_id,
            t.week_number,
            t.topic_number,
            t.title,
            JSON.stringify(t.concepts),
            t.custom_video_url || null,
            t.custom_reference_url || null,
            t.order_index,
          ]
        );
      }

      // Insert Tasks
      for (const t of tasks) {
        db.runSync(
          `INSERT INTO tasks (id, checklist_id, topic_id, topic_ids, title, slug, difficulty, url, is_paid_only, status, order_index)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            t.id,
            t.checklist_id,
            t.topic_id,
            JSON.stringify(t.topic_ids),
            t.title,
            t.slug,
            t.difficulty,
            t.url,
            t.is_paid_only ? 1 : 0,
            t.status,
            t.order_index,
          ]
        );
      }

      // Insert Study Plan
      db.runSync(
        `INSERT INTO study_plans (id, checklist_id, start_date, total_weeks, daily_study_minutes, is_active)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          studyPlan.id,
          studyPlan.checklist_id,
          studyPlan.start_date,
          studyPlan.total_weeks,
          studyPlan.daily_study_minutes,
          studyPlan.is_active ? 1 : 0,
        ]
      );

      // Insert Plan Days and mappings
      for (const day of planDays) {
        db.runSync(
          `INSERT INTO plan_days (id, plan_id, day_number, week_number, calendar_date, is_rest_day, is_weekly_review_day, topic_id, estimated_minutes)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            day.id,
            day.plan_id,
            day.day_number,
            day.week_number,
            day.calendar_date,
            day.is_rest_day ? 1 : 0,
            day.is_weekly_review_day ? 1 : 0,
            day.topic_id || null,
            day.estimated_minutes,
          ]
        );

        if (day.tasks) {
          day.tasks.forEach((task, idx) => {
            db.runSync(
              `INSERT INTO plan_day_tasks (id, plan_day_id, task_id, order_index, is_concept_review)
               VALUES (?, ?, ?, ?, ?)`,
              [`pdt_${day.id}_${task.id}`, day.id, task.id, idx, 0]
            );
          });
        }
      }
    });

    set({
      checklist,
      topics,
      tasks,
      studyPlan,
      planDays,
    });
  },

  toggleTaskCompletion: async (taskId, planDayId, notes) => {
    const db = getDatabase();
    const currentCompletions = { ...get().completions };
    const now = new Date().toISOString();
    const todayStr = format(new Date(), 'yyyy-MM-dd');

    if (currentCompletions[taskId]) {
      // Un-complete task
      delete currentCompletions[taskId];
      db.runSync('DELETE FROM task_completions WHERE task_id = ?', [taskId]);
    } else {
      // Mark task as done
      const completion: TaskCompletion = {
        id: `comp_${Date.now()}_${taskId}`,
        task_id: taskId,
        plan_day_id: planDayId,
        completed_at: now,
        completion_source: 'manual',
        notes_approach: notes?.approach,
        notes_complexity: notes?.complexity,
        notes_mistakes: notes?.mistakes,
      };

      currentCompletions[taskId] = completion;
      db.runSync(
        `INSERT OR REPLACE INTO task_completions (
          id, task_id, plan_day_id, completed_at, completion_source,
          notes_approach, notes_complexity, notes_mistakes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          completion.id,
          completion.task_id,
          completion.plan_day_id || null,
          completion.completed_at,
          completion.completion_source,
          completion.notes_approach || null,
          completion.notes_complexity || null,
          completion.notes_mistakes || null,
        ]
      );

      // Create / initialize revision item scheduled for tomorrow (10m revision of yesterday's work)
      const tomorrowStr = format(addDays(new Date(), 1), 'yyyy-MM-dd');
      const existingRev = db.getFirstSync<RevisionItem>(
        'SELECT * FROM revision_items WHERE task_id = ?',
        [taskId]
      );

      if (!existingRev) {
        db.runSync(
          `INSERT INTO revision_items (id, task_id, interval_days, repetition_count, last_rating, next_due_date, last_reviewed_at)
           VALUES (?, ?, 1, 0, 'shaky', ?, ?)`,
          [`rev_${taskId}`, taskId, tomorrowStr, now]
        );
      }

      // Update streak
      const currentStreak = { ...get().streak };
      if (currentStreak.last_active_date !== todayStr) {
        const lastDate = currentStreak.last_active_date
          ? parseISO(currentStreak.last_active_date)
          : null;
        if (lastDate && isYesterday(lastDate)) {
          currentStreak.current_streak += 1;
        } else if (!lastDate || !isToday(lastDate)) {
          currentStreak.current_streak = 1;
        }
        currentStreak.longest_streak = Math.max(
          currentStreak.longest_streak,
          currentStreak.current_streak
        );
        currentStreak.last_active_date = todayStr;

        db.runSync(
          `INSERT OR REPLACE INTO streaks (id, current_streak, longest_streak, freezes_available, last_active_date, freeze_used_this_week)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            currentStreak.id,
            currentStreak.current_streak,
            currentStreak.longest_streak,
            currentStreak.freezes_available,
            currentStreak.last_active_date,
            currentStreak.freeze_used_this_week ? 1 : 0,
          ]
        );
        set({ streak: currentStreak });
      }
    }

    set({ completions: currentCompletions });

    // Check if all today's tasks are done, and cancel smart evening notification if so!
    const todayPlanDay = get().planDays.find((d) => d.calendar_date === todayStr);
    if (todayPlanDay && todayPlanDay.tasks) {
      const allDone = todayPlanDay.tasks.every((t) => !!currentCompletions[t.id]);
      if (allDone) {
        cancelEveningReminderIfComplete();
      }
    }
  },

  recordRevision: async (taskId, rating) => {
    const db = getDatabase();
    const now = new Date().toISOString();
    const existing = db.getFirstSync<RevisionItem>(
      'SELECT * FROM revision_items WHERE task_id = ?',
      [taskId]
    );

    const { intervalDays, nextDueDate } = calculateNextReview(
      rating,
      existing ? existing.interval_days : 1,
      existing ? existing.repetition_count : 0
    );

    const updatedItem: RevisionItem = {
      id: existing ? existing.id : `rev_${taskId}`,
      task_id: taskId,
      interval_days: intervalDays,
      repetition_count: (existing?.repetition_count || 0) + 1,
      last_rating: rating,
      next_due_date: nextDueDate,
      last_reviewed_at: now,
    };

    db.runSync(
      `INSERT OR REPLACE INTO revision_items (
        id, task_id, interval_days, repetition_count, last_rating, next_due_date, last_reviewed_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        updatedItem.id,
        updatedItem.task_id,
        updatedItem.interval_days,
        updatedItem.repetition_count,
        updatedItem.last_rating,
        updatedItem.next_due_date,
        updatedItem.last_reviewed_at,
      ]
    );

    const taskMap = new Map(get().tasks.map((t) => [t.id, t]));
    const completionMap = get().completions;

    const newRevisionList = get()
      .revisionItems.filter((r) => r.task_id !== taskId)
      .concat({
        ...updatedItem,
        task: taskMap.get(taskId),
        completion: completionMap[taskId],
      })
      .sort((a, b) => a.next_due_date.localeCompare(b.next_due_date));

    set({ revisionItems: newRevisionList });
  },

  moveTask: async (taskId, fromDayId, toDayId) => {
    const db = getDatabase();
    const planDays = [...get().planDays];
    const fromIndex = planDays.findIndex((d) => d.id === fromDayId);
    const toIndex = planDays.findIndex((d) => d.id === toDayId);

    if (fromIndex === -1 || toIndex === -1) return;

    const fromDay = { ...planDays[fromIndex] };
    const toDay = { ...planDays[toIndex] };

    const taskToMove = fromDay.tasks?.find((t) => t.id === taskId);
    if (!taskToMove) return;

    fromDay.tasks = (fromDay.tasks || []).filter((t) => t.id !== taskId);
    toDay.tasks = [...(toDay.tasks || []), taskToMove];

    planDays[fromIndex] = fromDay;
    planDays[toIndex] = toDay;

    db.runSync(
      'UPDATE plan_day_tasks SET plan_day_id = ? WHERE task_id = ? AND plan_day_id = ?',
      [toDayId, taskId, fromDayId]
    );

    set({ planDays });
  },

  rescheduleMissedTasks: async () => {
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    const { planDays, completions } = get();
    const db = getDatabase();

    const missedTasks: { task: Task; oldDayId: string }[] = [];
    const futureDays = planDays.filter(
      (d) => d.calendar_date >= todayStr && !d.is_rest_day && !d.is_weekly_review_day
    );

    // Identify past incomplete tasks
    for (const day of planDays) {
      if (day.calendar_date < todayStr && day.tasks) {
        for (const task of day.tasks) {
          if (!completions[task.id]) {
            missedTasks.push({ task, oldDayId: day.id });
          }
        }
      }
    }

    if (missedTasks.length === 0 || futureDays.length === 0) {
      return { rescheduledCount: 0 };
    }

    // Distribute missed tasks evenly without violating the rule:
    // Never move a Hard onto a day that already has a Hard task!
    let rescheduledCount = 0;
    const updatedPlanDays = [...planDays];

    for (const { task, oldDayId } of missedTasks) {
      // Find eligible future day
      const targetDay = futureDays.find((day) => {
        const currentTasks = day.tasks || [];
        const currentMins = currentTasks.reduce((sum, t) => {
          return sum + (t.difficulty === 'Easy' ? 20 : t.difficulty === 'Medium' ? 35 : 60);
        }, 0);

        const taskMins = task.difficulty === 'Easy' ? 20 : task.difficulty === 'Medium' ? 35 : 60;
        const wouldExceedDaily = currentMins + taskMins > (get().profile?.daily_study_minutes || 60) + 15;
        if (wouldExceedDaily) return false;

        if (task.difficulty === 'Hard') {
          const hasHard = currentTasks.some((t) => t.difficulty === 'Hard');
          if (hasHard) return false;
        }

        return true;
      }) || futureDays[0]; // fallback to earliest future day if completely packed

      if (targetDay) {
        // Remove from old day
        const oldDayIndex = updatedPlanDays.findIndex((d) => d.id === oldDayId);
        if (oldDayIndex !== -1) {
          updatedPlanDays[oldDayIndex] = {
            ...updatedPlanDays[oldDayIndex],
            tasks: (updatedPlanDays[oldDayIndex].tasks || []).filter((t) => t.id !== task.id),
          };
        }

        // Add to target day
        const targetDayIndex = updatedPlanDays.findIndex((d) => d.id === targetDay.id);
        if (targetDayIndex !== -1) {
          updatedPlanDays[targetDayIndex] = {
            ...updatedPlanDays[targetDayIndex],
            tasks: [...(updatedPlanDays[targetDayIndex].tasks || []), task],
          };
        }

        db.runSync(
          'UPDATE plan_day_tasks SET plan_day_id = ? WHERE task_id = ? AND plan_day_id = ?',
          [targetDay.id, task.id, oldDayId]
        );

        rescheduledCount += 1;
      }
    }

    set({ planDays: updatedPlanDays });
    return { rescheduledCount };
  },

  updateTopicVideo: async (topicId, videoUrl) => {
    const db = getDatabase();
    db.runSync('UPDATE topics SET custom_video_url = ? WHERE id = ?', [videoUrl, topicId]);

    const updatedTopics = get().topics.map((t) =>
      t.id === topicId ? { ...t, custom_video_url: videoUrl } : t
    );
    set({ topics: updatedTopics });
  },

  updateNotificationSettings: async (settings) => {
    const db = getDatabase();
    const current = get().notificationSettings;
    const merged = { ...current, ...settings };

    db.runSync(
      `INSERT OR REPLACE INTO notification_settings (
        id, morning_nudge_enabled, morning_nudge_time, evening_reminder_enabled,
        evening_reminder_time, escalation_enabled, quiet_hours_start, quiet_hours_end, snooze_until
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        merged.id,
        merged.morning_nudge_enabled ? 1 : 0,
        merged.morning_nudge_time,
        merged.evening_reminder_enabled ? 1 : 0,
        merged.evening_reminder_time,
        merged.escalation_enabled ? 1 : 0,
        merged.quiet_hours_start,
        merged.quiet_hours_end,
        merged.snooze_until || null,
      ]
    );

    set({ notificationSettings: merged });
  },

  useStreakFreeze: async () => {
    const currentStreak = { ...get().streak };
    if (currentStreak.freezes_available <= 0 || currentStreak.freeze_used_this_week) {
      return false;
    }

    currentStreak.freezes_available -= 1;
    currentStreak.freeze_used_this_week = true;
    currentStreak.last_active_date = format(new Date(), 'yyyy-MM-dd');

    const db = getDatabase();
    db.runSync(
      `UPDATE streaks SET freezes_available = ?, freeze_used_this_week = 1, last_active_date = ? WHERE id = ?`,
      [currentStreak.freezes_available, currentStreak.last_active_date, currentStreak.id]
    );

    set({ streak: currentStreak });
    return true;
  },
}));
