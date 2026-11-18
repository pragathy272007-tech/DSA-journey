import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Typography, BorderRadius } from '../../src/constants/theme';
import { useAppStore } from '../../src/store/useAppStore';
import { CircularProgress } from '../../src/components/ui/CircularProgress';
import { GlassCard } from '../../src/components/ui/GlassCard';
import { Button } from '../../src/components/ui/Button';
import { Badge } from '../../src/components/ui/Badge';
import { RecallDeck } from '../../src/components/domain/RecallDeck';
import { TaskCard } from '../../src/components/domain/TaskCard';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import * as Haptics from 'expo-haptics';

export default function TodayScreen() {
  const router = useRouter();
  const profile = useAppStore((state) => state.profile);
  const planDays = useAppStore((state) => state.planDays);
  const topics = useAppStore((state) => state.topics);
  const completions = useAppStore((state) => state.completions);
  const revisionItems = useAppStore((state) => state.revisionItems);
  const streak = useAppStore((state) => state.streak);
  const toggleTaskCompletion = useAppStore((state) => state.toggleTaskCompletion);
  const recordRevision = useAppStore((state) => state.recordRevision);

  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const todayPlanDay = planDays.find((d) => d.calendar_date === todayStr) || planDays[0];
  const topic = topics.find((t) => t.id === todayPlanDay?.topic_id);

  // Yesterday revision items due today
  const dueRevisions = revisionItems.filter(
    (item) => item.next_due_date <= todayStr && !item.last_reviewed_at.startsWith(todayStr)
  );

  const [revisionDismissed, setRevisionDismissed] = useState(false);

  const tasks = todayPlanDay?.tasks || [];
  const completedCount = tasks.filter((t) => !!completions[t.id]).length;
  const progressRatio = tasks.length > 0 ? completedCount / tasks.length : 0;

  // Handle Find in My Playlist
  const handleWatchVideo = () => {
    Haptics.selectionAsync().catch(() => {});
    if (topic?.custom_video_url) {
      Linking.openURL(topic.custom_video_url).catch(() => {});
      return;
    }
    const playlistName = profile?.default_playlist_name || 'Striver A2Z DSA Playlist';
    const query = encodeURIComponent(`${topic?.title || 'DSA'} ${playlistName}`);
    Linking.openURL(`https://www.youtube.com/results?search_query=${query}`).catch(() => {});
  };

  const handleOpenReference = () => {
    Haptics.selectionAsync().catch(() => {});
    const url = topic?.custom_reference_url || profile?.reference_website_url || 'https://takeuforward.org';
    Linking.openURL(url).catch(() => {});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Header & Streak Bar */}
        <View style={styles.headerRow}>
          <View>
            <Text style={[Typography.caption, styles.dateLabel]}>
              {format(new Date(), 'EEEE, MMMM d')}
            </Text>
            <Text style={[Typography.h1, styles.greeting]}>
              Day {todayPlanDay?.day_number || 1}
            </Text>
          </View>

          <View style={styles.headerRight}>
            <Pressable
              onPress={() => router.push('/(tabs)/progress')}
              style={styles.streakPill}
            >
              <Ionicons name="flame" size={18} color={Colors.dark.streak} />
              <Text style={[Typography.bodyBold, styles.streakCount]}>
                {streak.current_streak}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.push('/import')}
              style={styles.importIcon}
              hitSlop={8}
            >
              <Ionicons name="cloud-upload-outline" size={20} color={Colors.dark.textSecondary} />
            </Pressable>
          </View>
        </View>

        {/* Daily Progress Ring & Agenda */}
        <GlassCard variant="elevated" style={styles.progressCard}>
          <View style={styles.progressInner}>
            <View style={styles.progressInfo}>
              <Text style={[Typography.caption, styles.agendaTitle]}>TODAY'S MISSION</Text>
              <Text style={[Typography.h3, styles.topicTitle]}>
                {topic?.title || 'Data Structures & Algorithms'}
              </Text>
              <Text style={[Typography.subtext, styles.timeEstimate]}>
                {tasks.length} tasks • ~{todayPlanDay?.estimated_minutes || 60} min required
              </Text>
            </View>

            <CircularProgress
              size={76}
              strokeWidth={7}
              progress={progressRatio}
              label={`${Math.round(progressRatio * 100)}%`}
              color={Colors.dark.primary}
            />
          </View>
        </GlassCard>

        {/* 1. 10-Minute Yesterday Revision Section */}
        {!revisionDismissed && dueRevisions.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={[Typography.caption, styles.sectionTitle]}>
                PHASE 1: 10-MINUTE YESTERDAY REVISION
              </Text>
              <Badge label="Active Recall" variant="streak" size="sm" />
            </View>
            <RecallDeck
              items={dueRevisions}
              onRateItem={(taskId, rating) => recordRevision(taskId, rating)}
              onCompleteSession={() => setRevisionDismissed(true)}
            />
          </View>
        )}

        {/* 2. Concepts & Video Launchers (Days 1 & 2 of topic) */}
        <View style={styles.section}>
          <Text style={[Typography.caption, styles.sectionTitle]}>
            LEARNING MATERIAL
          </Text>

          <GlassCard style={styles.resourceCard}>
            <View style={styles.resourceRow}>
              <View style={styles.resourceTextCol}>
                <Text style={[Typography.bodyBold, { color: Colors.dark.textPrimary }]}>
                  {topic?.title} Video
                </Text>
                <Text style={[Typography.caption, { color: Colors.dark.textMuted }]}>
                  Source: {profile?.default_playlist_name || 'Striver A2Z'}
                </Text>
              </View>

              <Button
                title="Find in Playlist"
                onPress={handleWatchVideo}
                variant="outline"
                size="sm"
                icon={<Ionicons name="logo-youtube" size={16} color={Colors.dark.primary} />}
              />
            </View>

            {topic && topic.concepts.length > 0 && (
              <View style={styles.conceptBox}>
                <Text style={[Typography.caption, styles.conceptHeader]}>
                  KEY CONCEPTS TO STUDY TODAY:
                </Text>
                {topic.concepts.slice(0, 3).map((concept, idx) => (
                  <View key={`c_${idx}`} style={styles.conceptBullet}>
                    <Ionicons name="ellipse" size={5} color={Colors.dark.primary} style={{ marginTop: 6, marginRight: 6 }} />
                    <Text style={[Typography.subtext, { color: Colors.dark.textSecondary, flex: 1 }]}>
                      {concept}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </GlassCard>
        </View>

        {/* 3. Today's Practice Problems */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[Typography.caption, styles.sectionTitle]}>
              PHASE 2: PRACTICE PROBLEMS ({completedCount}/{tasks.length})
            </Text>
            {completedCount === tasks.length && tasks.length > 0 && (
              <Badge label="All Done!" variant="success" size="sm" />
            )}
          </View>

          {tasks.length === 0 ? (
            <GlassCard style={styles.emptyCard}>
              <Ionicons name="sunny-outline" size={32} color={Colors.dark.streak} />
              <Text style={[Typography.h3, styles.emptyTitle]}>Rest & Review Day</Text>
              <Text style={[Typography.subtext, styles.emptySub]}>
                No new problems scheduled. Head to the Revise tab to reinforce weak topics.
              </Text>
            </GlassCard>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                completion={completions[task.id]}
                onToggleDone={(notes) =>
                  toggleTaskCompletion(task.id, todayPlanDay?.id, notes)
                }
                onReplaceWithFree={(t) => {
                  Alert.alert(
                    'Replace Premium Question',
                    `Free alternative recommended from topic tags: "Rotting Oranges" or "Number of Provinces". Would you like to practice that instead?`,
                    [{ text: 'Dismiss' }]
                  );
                }}
                onSkip={(t) => {
                  Alert.alert('Skip Premium Task', 'Marking as skipped for today.');
                  toggleTaskCompletion(t.id, todayPlanDay?.id, { approach: 'Skipped (Premium)' });
                }}
              />
            ))
          )}
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.base,
  },
  dateLabel: {
    color: Colors.dark.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  greeting: {
    color: Colors.dark.textPrimary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  streakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 165, 36, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(245, 165, 36, 0.4)',
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
  },
  streakCount: {
    color: Colors.dark.streak,
    marginLeft: 4,
  },
  importIcon: {
    backgroundColor: Colors.dark.surfaceElevated,
    borderRadius: BorderRadius.full,
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  progressCard: {
    marginBottom: Spacing.lg,
  },
  progressInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  agendaTitle: {
    color: Colors.dark.primary,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  topicTitle: {
    color: Colors.dark.textPrimary,
    marginTop: 2,
  },
  timeEstimate: {
    color: Colors.dark.textMuted,
    marginTop: 4,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    color: Colors.dark.textMuted,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  resourceCard: {
    padding: Spacing.md,
  },
  resourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resourceTextCol: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  conceptBox: {
    marginTop: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
  },
  conceptHeader: {
    color: Colors.dark.textMuted,
    fontWeight: '700',
    marginBottom: 6,
  },
  conceptBullet: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  emptyCard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
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
});
