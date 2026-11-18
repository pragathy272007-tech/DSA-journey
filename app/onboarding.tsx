import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Typography, BorderRadius } from '../src/constants/theme';
import { GlassCard } from '../src/components/ui/GlassCard';
import { Button } from '../src/components/ui/Button';
import { Input } from '../src/components/ui/Input';
import { ProgressBar } from '../src/components/ui/ProgressBar';
import { ProgrammingLanguage } from '../src/db/types';
import { useAppStore } from '../src/store/useAppStore';
import { validateLeetCodeUsername } from '../src/services/leetcode';
import { requestNotificationPermissions, scheduleMorningNudge } from '../src/services/notifications';
import { SEED_CHECKLIST, SEED_TOPICS, SEED_TASKS } from '../src/fixtures/defaultPlan';
import { generateStudyPlan } from '../src/services/planGenerator';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function OnboardingScreen() {
  const router = useRouter();
  const updateProfile = useAppStore((state) => state.updateProfile);
  const saveCurriculum = useAppStore((state) => state.saveCurriculum);

  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [leetcodeUsername, setLeetcodeUsername] = useState('');
  const [isValidatingLeetCode, setIsValidatingLeetCode] = useState(false);
  const [language, setLanguage] = useState<ProgrammingLanguage>('cpp');
  const [selectedPlaylistName, setSelectedPlaylistName] = useState('Striver A2Z Playlist');
  const [selectedPlaylistUrl, setSelectedPlaylistUrl] = useState(
    'https://youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_St8'
  );
  const [referenceUrl, setReferenceUrl] = useState('https://takeuforward.org');
  const [studyDurationWeeks, setStudyDurationWeeks] = useState(12);
  const [dailyMinutes, setDailyMinutes] = useState('60');
  const [reminderTime, setReminderTime] = useState('08:00');

  const videoPresets = [
    { name: 'Striver A2Z Playlist', url: 'https://youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_St8' },
    { name: 'Striver SDE Sheet', url: 'https://youtube.com/playlist?list=PLgUwDviBIf0rPG3Ictpu74YWBQ1CaBkm2' },
    { name: 'NeetCode 150', url: 'https://youtube.com/playlist?list=PLot-Xpze53ldVwtstag2TL4HQhAnC8fZf' },
    { name: 'Apna College DSA', url: 'https://youtube.com/playlist?list=PLfqMhTWNBTe0b2nM6JHVCnAkhQRGiZMSJ' },
    { name: 'Love Babbar 450', url: 'https://youtube.com/playlist?list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA' },
  ];

  const handleNext = async () => {
    Haptics.selectionAsync().catch(() => {});

    if (step === 1) {
      if (!name.trim()) {
        Alert.alert('Required', 'Please enter your name.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (leetcodeUsername.trim()) {
        setIsValidatingLeetCode(true);
        const exists = await validateLeetCodeUsername(leetcodeUsername);
        setIsValidatingLeetCode(false);
        if (!exists) {
          Alert.alert('Username Warning', 'Could not verify LeetCode username. Continue anyway?', [
            { text: 'Edit', style: 'cancel' },
            { text: 'Continue', onPress: () => setStep(3) },
          ]);
          return;
        }
      }
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      await finishOnboarding();
    }
  };

  const finishOnboarding = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});

    // Request notification permission and schedule morning nudge
    const granted = await requestNotificationPermissions();
    if (granted) {
      await scheduleMorningNudge(1, 3, 50, reminderTime);
    }

    // Save profile to SQLite
    await updateProfile({
      name: name.trim() || 'DSA Learner',
      email: email.trim() || 'learner@dsajourney.app',
      linkedin_url: linkedinUrl.trim(),
      leetcode_username: leetcodeUsername.trim(),
      leetcode_verified: !!leetcodeUsername.trim(),
      preferred_language: language,
      default_playlist_name: selectedPlaylistName,
      default_playlist_url: selectedPlaylistUrl,
      reference_website_name: 'takeuforward.org',
      reference_website_url: referenceUrl,
      study_duration_weeks: studyDurationWeeks,
      daily_study_minutes: parseInt(dailyMinutes, 10) || 60,
      reminder_time: reminderTime,
    });

    // Generate study plan and save
    const { studyPlan, planDays } = generateStudyPlan(
      SEED_CHECKLIST,
      SEED_TOPICS,
      SEED_TASKS,
      {
        totalWeeks: studyDurationWeeks,
        dailyStudyMinutes: parseInt(dailyMinutes, 10) || 60,
      }
    );

    await saveCurriculum(
      SEED_CHECKLIST,
      SEED_TOPICS,
      SEED_TASKS,
      studyPlan,
      planDays
    );

    router.replace('/(tabs)/today');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <ProgressBar progress={step / totalSteps} height={4} />
        <Text style={[Typography.caption, styles.stepIndicator]}>
          STEP {step} OF {totalSteps}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Step 1: Personal Info */}
        {step === 1 && (
          <GlassCard variant="elevated" style={styles.card}>
            <Text style={[Typography.h1, styles.stepTitle]}>Welcome to DSA Journey</Text>
            <Text style={[Typography.body, styles.stepSub]}>
              A structured 12-week algorithm sprint designed for mastery, retention, and disciplined daily recall.
            </Text>

            <Input
              label="Your Full Name"
              placeholder="e.g. Alex Turner"
              value={name}
              onChangeText={setName}
            />

            <Input
              label="Email Address"
              placeholder="alex@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <Input
              label="LinkedIn URL (Optional)"
              placeholder="https://linkedin.com/in/alex"
              value={linkedinUrl}
              onChangeText={setLinkedinUrl}
            />
          </GlassCard>
        )}

        {/* Step 2: LeetCode Account */}
        {step === 2 && (
          <GlassCard variant="elevated" style={styles.card}>
            <Text style={[Typography.h1, styles.stepTitle]}>Connect LeetCode</Text>
            <Text style={[Typography.body, styles.stepSub]}>
              Your accepted submissions will automatically mark matching tasks as completed in your roadmap.
            </Text>

            <Input
              label="LeetCode Username"
              placeholder="e.g. neetcode"
              value={leetcodeUsername}
              onChangeText={setLeetcodeUsername}
              helperText="You can also skip and set this up anytime later."
            />
          </GlassCard>
        )}

        {/* Step 3: Language & Video Presets */}
        {step === 3 && (
          <GlassCard variant="elevated" style={styles.card}>
            <Text style={[Typography.h1, styles.stepTitle]}>Learning Stack</Text>
            <Text style={[Typography.body, styles.stepSub]}>
              Select your primary language and preferred lecture series for topic deep-dives.
            </Text>

            <Text style={[Typography.caption, styles.fieldHeader]}>PROGRAMMING LANGUAGE</Text>
            <View style={styles.choiceRow}>
              {(['cpp', 'java', 'python'] as ProgrammingLanguage[]).map((lang) => (
                <Pressable
                  key={lang}
                  onPress={() => setLanguage(lang)}
                  style={[
                    styles.choicePill,
                    language === lang && styles.choicePillActive,
                  ]}
                >
                  <Text
                    style={[
                      Typography.caption,
                      styles.choiceText,
                      language === lang && styles.choiceTextActive,
                    ]}
                  >
                    {lang === 'cpp' ? 'C++' : lang === 'java' ? 'Java' : 'Python'}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={[Typography.caption, styles.fieldHeader]}>DEFAULT VIDEO PLAYLIST</Text>
            {videoPresets.map((preset) => {
              const isSelected = selectedPlaylistName === preset.name;
              return (
                <Pressable
                  key={preset.name}
                  onPress={() => {
                    setSelectedPlaylistName(preset.name);
                    setSelectedPlaylistUrl(preset.url);
                  }}
                  style={[
                    styles.playlistCard,
                    isSelected && styles.playlistCardActive,
                  ]}
                >
                  <Ionicons
                    name="logo-youtube"
                    size={20}
                    color={isSelected ? Colors.dark.primary : Colors.dark.textMuted}
                  />
                  <Text
                    style={[
                      Typography.bodyBold,
                      styles.playlistName,
                      isSelected && { color: Colors.dark.primary },
                    ]}
                  >
                    {preset.name}
                  </Text>
                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={18} color={Colors.dark.primary} />
                  )}
                </Pressable>
              );
            })}
          </GlassCard>
        )}

        {/* Step 4: Schedule Duration & Reminders */}
        {step === 4 && (
          <GlassCard variant="elevated" style={styles.card}>
            <Text style={[Typography.h1, styles.stepTitle]}>Study Pace & Habit</Text>
            <Text style={[Typography.body, styles.stepSub]}>
              Configure your daily study window and notification schedule.
            </Text>

            <Text style={[Typography.caption, styles.fieldHeader]}>JOURNEY DURATION</Text>
            <View style={styles.choiceRow}>
              {[8, 12, 16].map((weeks) => (
                <Pressable
                  key={weeks}
                  onPress={() => setStudyDurationWeeks(weeks)}
                  style={[
                    styles.choicePill,
                    studyDurationWeeks === weeks && styles.choicePillActive,
                  ]}
                >
                  <Text
                    style={[
                      Typography.caption,
                      styles.choiceText,
                      studyDurationWeeks === weeks && styles.choiceTextActive,
                    ]}
                  >
                    {weeks} Weeks
                  </Text>
                </Pressable>
              ))}
            </View>

            <Input
              label="Daily Study Goal (Minutes)"
              value={dailyMinutes}
              onChangeText={setDailyMinutes}
              keyboardType="numeric"
            />

            <Input
              label="Morning Agenda Nudge Time"
              value={reminderTime}
              onChangeText={setReminderTime}
              helperText="Duolingo-style smart reminder fires only if work is pending."
            />
          </GlassCard>
        )}

        {/* Navigation Buttons */}
        <View style={styles.navButtonsRow}>
          {step > 1 && (
            <Button
              title="Back"
              onPress={() => setStep(step - 1)}
              variant="secondary"
              size="lg"
              style={{ flex: 1, marginRight: Spacing.sm }}
            />
          )}

          <Button
            title={step === totalSteps ? 'Begin Journey' : 'Continue'}
            onPress={handleNext}
            loading={isValidatingLeetCode}
            variant="primary"
            size="lg"
            style={{ flex: 2 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  stepIndicator: {
    color: Colors.dark.textMuted,
    fontWeight: '700',
    marginTop: 8,
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing['4xl'],
  },
  card: {
    padding: Spacing.lg,
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  stepTitle: {
    color: Colors.dark.textPrimary,
  },
  stepSub: {
    color: Colors.dark.textSecondary,
    marginTop: Spacing.xs,
    marginBottom: Spacing.lg,
    lineHeight: 22,
  },
  fieldHeader: {
    color: Colors.dark.textMuted,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
    marginTop: Spacing.sm,
  },
  choiceRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.base,
  },
  choicePill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.dark.surfaceSubtle,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    alignItems: 'center',
  },
  choicePillActive: {
    borderColor: Colors.dark.primary,
    backgroundColor: 'rgba(45, 212, 167, 0.15)',
  },
  choiceText: {
    color: Colors.dark.textSecondary,
    fontWeight: '600',
  },
  choiceTextActive: {
    color: Colors.dark.primary,
    fontWeight: '700',
  },
  playlistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surfaceSubtle,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  playlistCardActive: {
    borderColor: Colors.dark.primary,
    backgroundColor: 'rgba(45, 212, 167, 0.08)',
  },
  playlistName: {
    color: Colors.dark.textPrimary,
    marginLeft: Spacing.md,
    flex: 1,
  },
  navButtonsRow: {
    flexDirection: 'row',
    marginTop: Spacing.sm,
  },
});
