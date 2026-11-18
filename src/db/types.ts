// Data Types & Domain Models for DSA Journey

export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type TaskStatus = 'resolved' | 'needs_link' | 'premium' | 'bonus';
export type ProgrammingLanguage = 'cpp' | 'java' | 'python';
export type RevisionRating = 'forgot' | 'shaky' | 'solid';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  linkedin_url?: string;
  leetcode_username?: string;
  leetcode_verified?: boolean;
  preferred_language: ProgrammingLanguage;
  default_playlist_name: string;
  default_playlist_url: string;
  reference_website_name: string;
  reference_website_url: string;
  study_duration_weeks: number;
  daily_study_minutes: number;
  reminder_time: string; // e.g. "08:00"
  evening_reminder_time: string; // e.g. "20:00"
  created_at: string;
}

export interface Checklist {
  id: string;
  title: string;
  source_type: 'notion' | 'markdown' | 'csv' | 'pasted' | 'default';
  created_at: string;
}

export interface Topic {
  id: string;
  checklist_id: string;
  week_number: number;
  topic_number: number;
  title: string;
  concepts: string[];
  custom_video_url?: string;
  custom_reference_url?: string;
  order_index: number;
}

export interface Task {
  id: string;
  checklist_id: string;
  topic_id: string;
  topic_ids: string[];
  title: string;
  slug: string;
  difficulty: Difficulty;
  url: string;
  is_paid_only: boolean;
  status: TaskStatus;
  order_index: number;
}

export interface StudyPlan {
  id: string;
  checklist_id: string;
  start_date: string; // YYYY-MM-DD
  total_weeks: number;
  daily_study_minutes: number;
  is_active: boolean;
}

export interface PlanDay {
  id: string;
  plan_id: string;
  day_number: number; // 1 to 84 (for 12 weeks)
  week_number: number; // 1 to 12
  calendar_date: string; // YYYY-MM-DD
  is_rest_day: boolean;
  is_weekly_review_day: boolean;
  topic_id?: string;
  estimated_minutes: number;
  tasks?: Task[];
}

export interface PlanDayTask {
  id: string;
  plan_day_id: string;
  task_id: string;
  order_index: number;
  is_concept_review: boolean;
}

export interface TaskCompletion {
  id: string;
  task_id: string;
  plan_day_id?: string;
  completed_at: string;
  completion_source: 'manual' | 'leetcode_sync';
  notes_approach?: string;
  notes_complexity?: string;
  notes_mistakes?: string;
}

export interface RevisionItem {
  id: string;
  task_id: string;
  interval_days: number;
  repetition_count: number;
  last_rating: RevisionRating;
  next_due_date: string; // YYYY-MM-DD
  last_reviewed_at: string;
  task?: Task;
  completion?: TaskCompletion;
}

export interface Streak {
  id: string;
  current_streak: number;
  longest_streak: number;
  freezes_available: number;
  last_active_date: string;
  freeze_used_this_week: boolean;
}

export interface NotificationSettings {
  id: string;
  morning_nudge_enabled: boolean;
  morning_nudge_time: string;
  evening_reminder_enabled: boolean;
  evening_reminder_time: string;
  escalation_enabled: boolean;
  quiet_hours_start: string;
  quiet_hours_end: string;
  snooze_until?: string | null;
}
