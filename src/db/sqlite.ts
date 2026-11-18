import * as SQLite from 'expo-sqlite';
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
} from './types';

let dbInstance: SQLite.SQLiteDatabase | null = null;

export const getDatabase = (): SQLite.SQLiteDatabase => {
  if (!dbInstance) {
    dbInstance = SQLite.openDatabaseSync('dsajourney.db');
    // Enable Write-Ahead Logging for speed and concurrency
    dbInstance.execSync('PRAGMA journal_mode = WAL;');
    dbInstance.execSync('PRAGMA foreign_keys = ON;');
  }
  return dbInstance;
};

export const initDatabase = () => {
  const db = getDatabase();

  db.execSync(`
    CREATE TABLE IF NOT EXISTS profiles (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      linkedin_url TEXT,
      leetcode_username TEXT,
      leetcode_verified INTEGER DEFAULT 0,
      preferred_language TEXT DEFAULT 'cpp',
      default_playlist_name TEXT,
      default_playlist_url TEXT,
      reference_website_name TEXT,
      reference_website_url TEXT,
      study_duration_weeks INTEGER DEFAULT 12,
      daily_study_minutes INTEGER DEFAULT 60,
      reminder_time TEXT DEFAULT '08:00',
      evening_reminder_time TEXT DEFAULT '20:00',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS checklists (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      source_type TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS topics (
      id TEXT PRIMARY KEY,
      checklist_id TEXT NOT NULL,
      week_number INTEGER NOT NULL,
      topic_number INTEGER NOT NULL,
      title TEXT NOT NULL,
      concepts TEXT NOT NULL,
      custom_video_url TEXT,
      custom_reference_url TEXT,
      order_index INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      checklist_id TEXT NOT NULL,
      topic_id TEXT NOT NULL,
      topic_ids TEXT NOT NULL,
      title TEXT NOT NULL,
      slug TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      url TEXT NOT NULL,
      is_paid_only INTEGER DEFAULT 0,
      status TEXT NOT NULL,
      order_index INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS study_plans (
      id TEXT PRIMARY KEY,
      checklist_id TEXT NOT NULL,
      start_date TEXT NOT NULL,
      total_weeks INTEGER DEFAULT 12,
      daily_study_minutes INTEGER DEFAULT 60,
      is_active INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS plan_days (
      id TEXT PRIMARY KEY,
      plan_id TEXT NOT NULL,
      day_number INTEGER NOT NULL,
      week_number INTEGER NOT NULL,
      calendar_date TEXT NOT NULL,
      is_rest_day INTEGER DEFAULT 0,
      is_weekly_review_day INTEGER DEFAULT 0,
      topic_id TEXT,
      estimated_minutes INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS plan_day_tasks (
      id TEXT PRIMARY KEY,
      plan_day_id TEXT NOT NULL,
      task_id TEXT NOT NULL,
      order_index INTEGER NOT NULL,
      is_concept_review INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS task_completions (
      id TEXT PRIMARY KEY,
      task_id TEXT NOT NULL,
      plan_day_id TEXT,
      completed_at TEXT NOT NULL,
      completion_source TEXT DEFAULT 'manual',
      notes_approach TEXT,
      notes_complexity TEXT,
      notes_mistakes TEXT
    );

    CREATE TABLE IF NOT EXISTS revision_items (
      id TEXT PRIMARY KEY,
      task_id TEXT NOT NULL,
      interval_days INTEGER DEFAULT 1,
      repetition_count INTEGER DEFAULT 0,
      last_rating TEXT NOT NULL,
      next_due_date TEXT NOT NULL,
      last_reviewed_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS streaks (
      id TEXT PRIMARY KEY,
      current_streak INTEGER DEFAULT 0,
      longest_streak INTEGER DEFAULT 0,
      freezes_available INTEGER DEFAULT 1,
      last_active_date TEXT,
      freeze_used_this_week INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS notification_settings (
      id TEXT PRIMARY KEY,
      morning_nudge_enabled INTEGER DEFAULT 1,
      morning_nudge_time TEXT DEFAULT '08:00',
      evening_reminder_enabled INTEGER DEFAULT 1,
      evening_reminder_time TEXT DEFAULT '20:00',
      escalation_enabled INTEGER DEFAULT 1,
      quiet_hours_start TEXT DEFAULT '23:00',
      quiet_hours_end TEXT DEFAULT '07:00',
      snooze_until TEXT
    );
  `);
};
