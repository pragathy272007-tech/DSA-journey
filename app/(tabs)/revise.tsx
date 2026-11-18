import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography, BorderRadius } from '../../src/constants/theme';
import { useAppStore } from '../../src/store/useAppStore';
import { GlassCard } from '../../src/components/ui/GlassCard';
import { Button } from '../../src/components/ui/Button';
import { Badge } from '../../src/components/ui/Badge';
import { RecallDeck } from '../../src/components/domain/RecallDeck';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import * as Haptics from 'expo-haptics';

export default function ReviseScreen() {
  const revisionItems = useAppStore((state) => state.revisionItems);
  const completions = useAppStore((state) => state.completions);
  const streak = useAppStore((state) => state.streak);
  const topics = useAppStore((state) => state.topics);
  const recordRevision = useAppStore((state) => state.recordRevision);

  const [activeSession, setActiveSession] = useState<'all' | 'forgot' | 'shaky'>('all');

  const todayStr = format(new Date(), 'yyyy-MM-dd');

  // Filter items by rating
  const forgotItems = revisionItems.filter((r) => r.last_rating === 'forgot');
  const shakyItems = revisionItems.filter((r) => r.last_rating === 'shaky');
  const solidItems = revisionItems.filter((r) => r.last_rating === 'solid');

  const activeQueue =
    activeSession === 'forgot'
      ? forgotItems
      : activeSession === 'shaky'
      ? shakyItems
      : revisionItems.filter((r) => r.next_due_date <= todayStr);

  const totalCompletionsCount = Object.keys(completions).length;
  const solidCount = solidItems.length;
  const revisionScore =
    revisionItems.length > 0
      ? Math.round((solidCount / revisionItems.length) * 100)
      : 100;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[Typography.caption, styles.subtitle]}>SPACED REPETITION & SUNDAY REVIEW</Text>
          <Text style={[Typography.h1, styles.title]}>Memory Vault</Text>
        </View>

        {/* Weekly Review Summary Scorecard */}
        <GlassCard variant="elevated" style={styles.scorecard}>
          <Text style={[Typography.caption, styles.scorecardLabel]}>WEEKLY REVISION SCORECARD</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statCol}>
              <Text style={[Typography.numeralLarge, styles.statNum]}>{totalCompletionsCount}</Text>
              <Text style={[Typography.caption, styles.statLabel]}>Problems Solved</Text>
            </View>

            <View style={styles.statCol}>
              <Text style={[Typography.numeralLarge, { color: Colors.dark.primary }]}>
                {revisionScore}%
              </Text>
              <Text style={[Typography.caption, styles.statLabel]}>Retention Rate</Text>
            </View>

            <View style={styles.statCol}>
              <Text style={[Typography.numeralLarge, { color: Colors.dark.streak }]}>
                {streak.current_streak}d
              </Text>
              <Text style={[Typography.caption, styles.statLabel]}>Active Streak</Text>
            </View>
          </View>
        </GlassCard>

        {/* Spaced Filter Tabs */}
        <View style={styles.filterRow}>
          <Pressable
            onPress={() => {
              Haptics.selectionAsync().catch(() => {});
              setActiveSession('all');
            }}
            style={[styles.filterPill, activeSession === 'all' && styles.filterPillActive]}
          >
            <Text style={[Typography.caption, activeSession === 'all' && styles.filterTextActive]}>
              Due Today ({activeQueue.length})
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              Haptics.selectionAsync().catch(() => {});
              setActiveSession('forgot');
            }}
            style={[styles.filterPill, activeSession === 'forgot' && styles.filterPillActive]}
          >
            <Text style={[Typography.caption, activeSession === 'forgot' && styles.filterTextActive]}>
              Forgot ({forgotItems.length})
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              Haptics.selectionAsync().catch(() => {});
              setActiveSession('shaky');
            }}
            style={[styles.filterPill, activeSession === 'shaky' && styles.filterPillActive]}
          >
            <Text style={[Typography.caption, activeSession === 'shaky' && styles.filterTextActive]}>
              Shaky ({shakyItems.length})
            </Text>
          </Pressable>
        </View>

        {/* Active Recall Practice Deck */}
        {activeQueue.length > 0 ? (
          <View style={styles.deckSection}>
            <RecallDeck
              items={activeQueue}
              onRateItem={(taskId, rating) => recordRevision(taskId, rating)}
              onCompleteSession={() => {}}
            />
          </View>
        ) : (
          <GlassCard style={styles.emptyCard}>
            <Ionicons name="shield-checkmark-outline" size={36} color={Colors.dark.primary} />
            <Text style={[Typography.h3, styles.emptyTitle]}>All Caught Up!</Text>
            <Text style={[Typography.subtext, styles.emptySub]}>
              No problems currently due in this interval. All reviewed concepts are progressing through their retention curves.
            </Text>
          </GlassCard>
        )}

        {/* Spaced Intervals Guide */}
        <View style={styles.guideCard}>
          <Text style={[Typography.caption, styles.guideHeader]}>SPACED REPETITION INTERVAL RULES</Text>
          <View style={styles.guideRow}>
            <Badge label="Forgot" variant="hard" size="sm" />
            <Text style={[Typography.caption, styles.guideText]}>
              Re-drills tomorrow (1-day interval) to rebuild mental pathways.
            </Text>
          </View>
          <View style={styles.guideRow}>
            <Badge label="Shaky" variant="medium" size="sm" />
            <Text style={[Typography.caption, styles.guideText]}>
              Returns after 1, 3, and 7 days until confidence solidifies.
            </Text>
          </View>
          <View style={styles.guideRow}>
            <Badge label="Solid" variant="easy" size="sm" />
            <Text style={[Typography.caption, styles.guideText]}>
              Pushed to 7, 14, and 30 days for permanent long-term retention.
            </Text>
          </View>
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
  scorecard: {
    marginBottom: Spacing.lg,
  },
  scorecardLabel: {
    color: Colors.dark.textMuted,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCol: {
    alignItems: 'center',
    flex: 1,
  },
  statNum: {
    color: Colors.dark.textPrimary,
  },
  statLabel: {
    color: Colors.dark.textMuted,
    marginTop: 2,
  },
  filterRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.base,
  },
  filterPill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.dark.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    alignItems: 'center',
  },
  filterPillActive: {
    borderColor: Colors.dark.primary,
    backgroundColor: 'rgba(45, 212, 167, 0.12)',
  },
  filterTextActive: {
    color: Colors.dark.primary,
    fontWeight: '700',
  },
  deckSection: {
    marginBottom: Spacing.lg,
  },
  emptyCard: {
    alignItems: 'center',
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  emptyTitle: {
    color: Colors.dark.textPrimary,
    marginTop: Spacing.sm,
  },
  emptySub: {
    color: Colors.dark.textMuted,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  guideCard: {
    backgroundColor: Colors.dark.surfaceElevated,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  guideHeader: {
    color: Colors.dark.textMuted,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
  },
  guideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  guideText: {
    color: Colors.dark.textSecondary,
    marginLeft: Spacing.sm,
    flex: 1,
  },
});
