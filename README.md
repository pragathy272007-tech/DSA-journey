# DSA Journey

A production-quality, local-first Android mobile application built with **Expo (React Native) + TypeScript**, **Expo Router**, **Supabase**, and **Expo SQLite**.

DSA Journey guides learners through a structured 12-week Data Structures and Algorithms roadmap: daily tasks, an active 10-minute recall of yesterday's work, Sunday spaced repetition reviews, streak tracking with freeze mechanics, and smart Duolingo-style adult reminders that self-cancel upon task completion.

---

## Architecture & Tech Stack

- **Framework**: Expo SDK 58 (React Native 0.88+) + TypeScript (Strict)
- **Navigation**: Expo Router (File-based tabs: `Today`, `Plan`, `Revise`, `Progress`, `Profile`)
- **Persistence (Local-First)**: `expo-sqlite` with Write-Ahead Logging (WAL) mode for instant offline responsiveness
- **Remote Cloud & Sync**: Supabase PostgreSQL + Row-Level Security (`user_id = auth.uid()`)
- **Edge Functions**: Supabase Deno Edge Functions for Notion public chunk scraping and LeetCode GraphQL gateway
- **Notifications**: `expo-notifications` with 3 dedicated Android channels, exact alarms, and auto-cancellation
- **State Management**: Zustand
- **Animations & Haptics**: Reanimated, `expo-haptics`, SVG circular progress rings

---

## Project Structure

```
DSA/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx         # Tab bar navigation shell
│   │   ├── today.tsx           # Daily core loop (10m Recall Deck + Today Tasks)
│   │   ├── plan.tsx            # 12-week roadmap, calendar view & rescheduling
│   │   ├── revise.tsx          # Sunday spaced repetition & memory vault
│   │   ├── progress.tsx        # Consistency heatmap & glass/metal achievement medals
│   │   └── profile.tsx         # Preferences, LeetCode sync, linked resources
│   ├── onboarding.tsx          # 4-step personalized setup
│   ├── import.tsx              # Notion / Markdown / CSV ingestion interface
│   ├── preview.tsx             # Interactive curriculum preview & editing
│   ├── topic/[id].tsx          # Topic deep-dive, concepts & playlist search
│   └── _layout.tsx             # Root layout & SQLite/notification initializer
├── seed/
│   ├── 12-Week-DSA-Checklist.md   # File A: Exact schedule fixture
│   ├── DSA-Topics-Patterns-...    # File B: Concepts & LeetCode URLs fixture
│   └── problems.json           # Pre-resolved dictionary (slug, difficulty, paid status)
├── src/
│   ├── components/
│   │   ├── domain/             # RecallDeck, TaskCard, Heatmap, MetalBadge
│   │   └── ui/                 # GlassCard, Button, Badge, ProgressBar, CircularProgress
│   ├── constants/theme.ts      # Mature dark-first design tokens & typography
│   ├── db/                     # SQLite schema, WAL mode, migrations, typed models
│   ├── fixtures/defaultPlan.ts # Pre-compiled benchmark curriculum
│   ├── services/               # Normalizer, Parser, PlanGenerator, SpacedRepetition, LeetCode, Notifications
│   └── store/useAppStore.ts    # Reactive Zustand store syncing with SQLite
├── supabase/
│   ├── functions/              # fetch-notion & leetcode-proxy Deno Edge functions
│   └── migrations/             # SQL schema with RLS policies
├── scripts/
│   ├── resolve-problems.js     # Build-time LeetCode metadata generator
│   └── generate-fixture.js     # Parses seed files into static TypeScript fixtures
├── tests/
│   └── run-all-tests.js        # 30-assertion automated verification suite
└── eas.json                    # EAS Build Android APK configuration
```

---

## Getting Started

### 1. Prerequisites
- **Node.js**: v18+ (LTS v22 recommended)
- **npm** or **bun**
- Physical Android phone with **Expo Go** installed (from Google Play Store), or an Android emulator.

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the App Locally
```bash
npx expo start
```
- Open the **Expo Go** app on your Android device.
- Scan the QR code displayed in the terminal.
- The app will initialize your local SQLite database and automatically load the benchmark 12-week DSA curriculum.

---

## Running the Automated Test Suite

Run the full verification suite covering:
1. 12 weeks & 12 topics validation
2. Exact task count per week and difficulty distribution (~140 total tasks)
3. Notion / Markdown parser & title-to-slug normalizer
4. Deduplication of multi-topic problems (e.g. *Two Sum*)
5. LeetCode Premium detection (`Meeting Rooms II`, `Encode and Decode Strings`, etc.)
6. Spaced repetition interval progression (Forgot: 1d; Shaky: 3d/7d; Solid: 7d/14d)
7. Overload & rescheduling constraints (never 2 Hard tasks on one study day)

```bash
npm test
```

---

## Supabase Setup & Remote Migrations (Optional)

The app works 100% offline out-of-the-box using `expo-sqlite`. To connect to a live Supabase project:

1. Create a project at [supabase.com](https://supabase.com).
2. Execute the migration script in your Supabase SQL Editor:
   ```
   supabase/migrations/20261117_init_schema.sql
   ```
3. Create a `.env` file in the root directory:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
4. Deploy the Supabase Edge Functions:
   ```bash
   npx supabase functions deploy fetch-notion
   npx supabase functions deploy leetcode-proxy
   ```

---

## Building a Standalone Android APK

To generate a standalone APK that can be installed on any Android phone and shared with friends without Expo Go:

1. Log in to your Expo account:
   ```bash
   npx eas-cli login
   ```
2. Configure project:
   ```bash
   npx eas-cli project:init
   ```
3. Run the APK build command:
   ```bash
   npx eas-cli build -p android --profile preview
   ```
4. Once completed, EAS will provide a direct download link for your standalone `.apk` file.
