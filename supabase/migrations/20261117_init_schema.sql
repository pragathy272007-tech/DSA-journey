-- Production Supabase PostgreSQL Schema with Strict RLS (user_id = auth.uid())

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  linkedin_url TEXT,
  leetcode_username TEXT,
  leetcode_verified BOOLEAN DEFAULT FALSE,
  preferred_language TEXT DEFAULT 'cpp',
  default_playlist_name TEXT,
  default_playlist_url TEXT,
  reference_website_name TEXT,
  reference_website_url TEXT,
  study_duration_weeks INTEGER DEFAULT 12,
  daily_study_minutes INTEGER DEFAULT 60,
  reminder_time TEXT DEFAULT '08:00',
  evening_reminder_time TEXT DEFAULT '20:00',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can delete own profile" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- 2. Checklists Table
CREATE TABLE IF NOT EXISTS public.checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  source_type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.checklists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own checklists" ON public.checklists FOR ALL USING (auth.uid() = user_id);

-- 3. Topics Table
CREATE TABLE IF NOT EXISTS public.topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  checklist_id UUID NOT NULL REFERENCES public.checklists(id) ON DELETE CASCADE,
  week_number INTEGER NOT NULL,
  topic_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  concepts JSONB DEFAULT '[]'::jsonb,
  custom_video_url TEXT,
  custom_reference_url TEXT,
  order_index INTEGER NOT NULL
);

ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own topics" ON public.topics FOR ALL USING (auth.uid() = user_id);

-- 4. Tasks Table
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  checklist_id UUID NOT NULL REFERENCES public.checklists(id) ON DELETE CASCADE,
  topic_id UUID NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
  topic_ids JSONB DEFAULT '[]'::jsonb,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  url TEXT NOT NULL,
  is_paid_only BOOLEAN DEFAULT FALSE,
  status TEXT NOT NULL,
  order_index INTEGER NOT NULL
);

ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own tasks" ON public.tasks FOR ALL USING (auth.uid() = user_id);

-- 5. Study Plans Table
CREATE TABLE IF NOT EXISTS public.study_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  checklist_id UUID NOT NULL REFERENCES public.checklists(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  total_weeks INTEGER DEFAULT 12,
  daily_study_minutes INTEGER DEFAULT 60,
  is_active BOOLEAN DEFAULT TRUE
);

ALTER TABLE public.study_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own study plans" ON public.study_plans FOR ALL USING (auth.uid() = user_id);

-- 6. Plan Days Table
CREATE TABLE IF NOT EXISTS public.plan_days (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.study_plans(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  week_number INTEGER NOT NULL,
  calendar_date DATE NOT NULL,
  is_rest_day BOOLEAN DEFAULT FALSE,
  is_weekly_review_day BOOLEAN DEFAULT FALSE,
  topic_id UUID REFERENCES public.topics(id),
  estimated_minutes INTEGER DEFAULT 0
);

ALTER TABLE public.plan_days ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own plan days" ON public.plan_days FOR ALL USING (auth.uid() = user_id);

-- 7. Task Completions Table
CREATE TABLE IF NOT EXISTS public.task_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  plan_day_id UUID REFERENCES public.plan_days(id),
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  completion_source TEXT DEFAULT 'manual',
  notes_approach TEXT,
  notes_complexity TEXT,
  notes_mistakes TEXT
);

ALTER TABLE public.task_completions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own task completions" ON public.task_completions FOR ALL USING (auth.uid() = user_id);

-- 8. Revision Items Table (Spaced Repetition)
CREATE TABLE IF NOT EXISTS public.revision_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  interval_days INTEGER DEFAULT 1,
  repetition_count INTEGER DEFAULT 0,
  last_rating TEXT NOT NULL,
  next_due_date DATE NOT NULL,
  last_reviewed_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.revision_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own revision items" ON public.revision_items FOR ALL USING (auth.uid() = user_id);

-- 9. Streaks Table
CREATE TABLE IF NOT EXISTS public.streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  freezes_available INTEGER DEFAULT 1,
  last_active_date DATE,
  freeze_used_this_week BOOLEAN DEFAULT FALSE
);

ALTER TABLE public.streaks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own streaks" ON public.streaks FOR ALL USING (auth.uid() = user_id);

-- 10. Notification Settings Table
CREATE TABLE IF NOT EXISTS public.notification_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  morning_nudge_enabled BOOLEAN DEFAULT TRUE,
  morning_nudge_time TEXT DEFAULT '08:00',
  evening_reminder_enabled BOOLEAN DEFAULT TRUE,
  evening_reminder_time TEXT DEFAULT '20:00',
  escalation_enabled BOOLEAN DEFAULT TRUE,
  quiet_hours_start TEXT DEFAULT '23:00',
  quiet_hours_end TEXT DEFAULT '07:00',
  snooze_until TIMESTAMPTZ
);

ALTER TABLE public.notification_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own notification settings" ON public.notification_settings FOR ALL USING (auth.uid() = user_id);
