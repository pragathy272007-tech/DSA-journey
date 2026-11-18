import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors } from '../src/constants/theme';
import { useAppStore } from '../src/store/useAppStore';
import { setupAndroidChannels } from '../src/services/notifications';
import { SEED_CHECKLIST, SEED_TOPICS, SEED_TASKS } from '../src/fixtures/defaultPlan';
import { generateStudyPlan } from '../src/services/planGenerator';

export default function RootLayout() {
  const initialize = useAppStore((state) => state.initialize);
  const isInitialized = useAppStore((state) => state.isInitialized);
  const checklist = useAppStore((state) => state.checklist);
  const saveCurriculum = useAppStore((state) => state.saveCurriculum);
  const updateProfile = useAppStore((state) => state.updateProfile);

  useEffect(() => {
    async function bootstrap() {
      await setupAndroidChannels();
      await initialize();

      // If database is brand new and has no plan loaded, seed the initial 12-week benchmark plan!
      const store = useAppStore.getState();
      if (!store.checklist || store.topics.length === 0) {
        const { studyPlan, planDays } = generateStudyPlan(
          SEED_CHECKLIST,
          SEED_TOPICS,
          SEED_TASKS
        );
        await saveCurriculum(SEED_CHECKLIST, SEED_TOPICS, SEED_TASKS, studyPlan, planDays);
        if (!store.profile) {
          await updateProfile({
            name: 'DSA Learner',
            preferred_language: 'cpp',
            default_playlist_name: 'Striver A2Z Playlist',
            default_playlist_url: 'https://youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_St8',
            reference_website_name: 'takeuforward.org',
            reference_website_url: 'https://takeuforward.org',
            study_duration_weeks: 12,
            daily_study_minutes: 60,
          });
        }
      }
    }
    bootstrap();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.dark.background },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ presentation: 'modal' }} />
        <Stack.Screen name="import" options={{ presentation: 'modal' }} />
        <Stack.Screen name="preview" options={{ presentation: 'card' }} />
        <Stack.Screen name="topic/[id]" options={{ presentation: 'card' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
