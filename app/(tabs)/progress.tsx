import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography, BorderRadius } from '../../src/constants/theme';
import { useAppStore } from '../../src/store/useAppStore';
import { GlassCard } from '../../src/components/ui/GlassCard';
import { Button } from '../../src/components/ui/Button';
import { Heatmap } from '../../src/components/domain/Heatmap';
import { MetalBadge } from '../../src/components/domain/MetalBadge';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function ProgressScreen() {
  const profile = useAppStore((state) => state.profile);
  const streak = useAppStore((state) => state.streak);
  const completions = useAppStore((state) => state.completions);
  const tasks = useAppStore((state) => state.tasks);
  const useStreakFreeze = useAppStore((state) => state.useStreakFreeze);

  const completedList = Object.values(completions);
  const totalSolved = completedList.length;

  const easySolved = completedList.filter((c) => {
    const t = tasks.find((item) => item.id === c.task_id);
    return t?.difficulty === 'Easy';
  }).length;

  const mediumSolved = completedList.filter((c) => {
    const t = tasks.find((item) => item.id === c.task_id);
    return t?.difficulty === 'Medium';
  }).length;

  const hardSolved = completedList.filter((c) => {
    const t = tasks.find((item) => item.id === c.task_id);
    return t?.difficulty === 'Hard';
  }).length;

  const completionDates = completedList.map((c) => c.completed_at);

  const handleUseFreeze = async () => {
    Haptics.selectionAsync().catch(() => {});
    if (streak.freezes_available <= 0) {
      Alert.alert('No Freezes Available', 'You earn 1 streak freeze per week.');
      return;
    }
    if (streak.freeze_used_this_week) {
      Alert.alert('Freeze Already Active', 'You have already utilized your 1 freeze for this calendar week.');
      return;
    }

    const success = await useStreakFreeze();
    if (success) {
      Alert.alert('Streak Protected', 'A freeze token has been consumed. Your streak is safeguarded for today.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[Typography.caption, styles.subtitle]}>ANALYTICS & MILESTONES</Text>
          <Text style={[Typography.h1, styles.title]}>Mastery Metrics</Text>
        </View>

        {/* Hero Streak Card */}
        <GlassCard variant="elevated" style={styles.heroCard} glow>
          <View style={styles.heroRow}>
            <View>
              <Text style={[Typography.caption, styles.heroLabel]}>DAILY STREAK</Text>
              <Text style={[Typography.numeralLarge, styles.heroStreakNum]}>
                {streak.current_streak} <Text style={{ fontSize: 20, color: Colors.dark.textMuted }}>DAYS</Text>
              </Text>
              <Text style={[Typography.caption, styles.heroBest]}>
                Personal Best: {streak.longest_streak} days
              </Text>
            </View>

            <View style={styles.freezeColumn}>
              <View style={styles.freezePill}>
                <Ionicons name="snow" size={14} color="#38BDF8" />
                <Text style={[Typography.caption, styles.freezeCount]}>
                  {streak.freezes_available} Freeze Left
                </Text>
              </View>
              <Button
                title="Use Freeze"
                onPress={handleUseFreeze}
                variant="outline"
                size="sm"
                disabled={streak.freezes_available <= 0 || streak.freeze_used_this_week}
                style={{ marginTop: 6 }}
              />
            </View>
          </View>
        </GlassCard>

        {/* Solved by Difficulty Breakdown */}
        <View style={styles.difficultyGrid}>
          <GlassCard style={styles.diffCard}>
            <Text style={[Typography.caption, { color: Colors.dark.difficultyEasy, fontWeight: '700' }]}>
              EASY SOLVED
            </Text>
            <Text style={[Typography.numeralMedium, styles.diffNum]}>{easySolved}</Text>
          </GlassCard>

          <GlassCard style={styles.diffCard}>
            <Text style={[Typography.caption, { color: Colors.dark.difficultyMedium, fontWeight: '700' }]}>
              MEDIUM SOLVED
            </Text>
            <Text style={[Typography.numeralMedium, styles.diffNum]}>{mediumSolved}</Text>
          </GlassCard>

          <GlassCard style={styles.diffCard}>
            <Text style={[Typography.caption, { color: Colors.dark.difficultyHard, fontWeight: '700' }]}>
              HARD SOLVED
            </Text>
            <Text style={[Typography.numeralMedium, styles.diffNum]}>{hardSolved}</Text>
          </GlassCard>
        </View>

        {/* GitHub-style Heatmap */}
        <View style={styles.heatmapSection}>
          <Heatmap completedDates={completionDates} totalWeeks={12} />
        </View>

        {/* Refined Metal / Glass Medals */}
        <View style={styles.badgesSection}>
          <Text style={[Typography.caption, styles.badgesSectionHeader]}>
            ACHIEVEMENT MEDALS (REFINED GLASS & METAL)
          </Text>

          <MetalBadge
            tier="bronze"
            title="Iron Discipline Medal"
            requirement="Maintain a 7-day continuous solving streak"
            unlocked={streak.current_streak >= 7}
            currentCount={Math.min(streak.current_streak, 7)}
            targetCount={7}
          />

          <MetalBadge
            tier="silver"
            title="Silver Architect Medal"
            requirement="Sustain a 30-day streak across core data structures"
            unlocked={streak.current_streak >= 30}
            currentCount={Math.min(streak.current_streak, 30)}
            targetCount={30}
          />

          <MetalBadge
            tier="gold"
            title="Gold Algorithmic Master"
            requirement="Surpass 60 days of relentless problem solving"
            unlocked={streak.current_streak >= 60}
            currentCount={Math.min(streak.current_streak, 60)}
            targetCount={60}
          />

          <MetalBadge
            tier="platinum"
            title="Platinum DSA Journey Centurion"
            requirement="Complete 100 days of active mastery"
            unlocked={streak.current_streak >= 100}
            currentCount={Math.min(streak.current_streak, 100)}
            targetCount={100}
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
  scrollContent: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing['4xl'],
    paddingTop: Spacing.sm,
  },
  header: {
    marginBottom: Spacing.base,
  },
  subtitle: {
    color: Colors.dark.textMuted,
    letterSpacing: 0.5,
  },
  title: {
    color: Colors.dark.textPrimary,
  },
  heroCard: {
    marginBottom: Spacing.base,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroLabel: {
    color: Colors.dark.streak,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  heroStreakNum: {
    color: Colors.dark.textPrimary,
    marginTop: 2,
  },
  heroBest: {
    color: Colors.dark.textMuted,
    marginTop: 4,
  },
  freezeColumn: {
    alignItems: 'flex-end',
  },
  freezePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  freezeCount: {
    color: '#38BDF8',
    marginLeft: 4,
    fontWeight: '600',
  },
  difficultyGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  diffCard: {
    flex: 1,
    padding: Spacing.md,
    alignItems: 'center',
  },
  diffNum: {
    color: Colors.dark.textPrimary,
    marginTop: 4,
  },
  heatmapSection: {
    marginBottom: Spacing.lg,
  },
  badgesSection: {
    marginBottom: Spacing.xl,
  },
  badgesSectionHeader: {
    color: Colors.dark.textMuted,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
  },
});
