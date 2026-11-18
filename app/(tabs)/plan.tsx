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
import { Colors, Spacing, Typography, BorderRadius } from '../../src/constants/theme';
import { useAppStore } from '../../src/store/useAppStore';
import { GlassCard } from '../../src/components/ui/GlassCard';
import { Button } from '../../src/components/ui/Button';
import { Badge } from '../../src/components/ui/Badge';
import { TaskCard } from '../../src/components/domain/TaskCard';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import * as Haptics from 'expo-haptics';

export default function PlanScreen() {
  const profile = useAppStore((state) => state.profile);
  const topics = useAppStore((state) => state.topics);
  const planDays = useAppStore((state) => state.planDays);
  const completions = useAppStore((state) => state.completions);
  const toggleTaskCompletion = useAppStore((state) => state.toggleTaskCompletion);
  const rescheduleMissedTasks = useAppStore((state) => state.rescheduleMissedTasks);
  const moveTask = useAppStore((state) => state.moveTask);

  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);

  const currentTopic = topics.find((t) => t.week_number === selectedWeek);
  const weekDays = planDays.filter((d) => d.week_number === selectedWeek);

  const activeDay = selectedDayId
    ? weekDays.find((d) => d.id === selectedDayId) || weekDays[0]
    : weekDays[0];

  const handleReschedule = async () => {
    Haptics.selectionAsync().catch(() => {});
    const result = await rescheduleMissedTasks();
    if (result.rescheduledCount > 0) {
      Alert.alert(
        'Schedule Re-balanced',
        `Successfully redistributed ${result.rescheduledCount} missed tasks across upcoming days without exceeding your daily time limit.`
      );
    } else {
      Alert.alert('On Track', 'No past incomplete tasks found to reschedule.');
    }
  };

  const handleMoveTaskPrompt = (taskId: string, currentDayId: string) => {
    Haptics.selectionAsync().catch(() => {});
    const targetDays = weekDays.filter((d) => d.id !== currentDayId);

    Alert.alert(
      'Move Task to Another Day',
      'Select target study day within this week:',
      targetDays.map((d) => ({
        text: `Day ${d.day_number} (${d.calendar_date})`,
        onPress: () => moveTask(taskId, currentDayId, d.id),
      })).concat([{ text: 'Cancel', style: 'cancel' } as any])
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={[Typography.caption, styles.subtitle]}>CURRICULUM TIMELINE</Text>
            <Text style={[Typography.h1, styles.title]}>12-Week Roadmap</Text>
          </View>

          <Button
            title="Reschedule Missed"
            onPress={handleReschedule}
            variant="outline"
            size="sm"
            icon={<Ionicons name="refresh-outline" size={15} color={Colors.dark.primary} />}
          />
        </View>

        {/* Week Selector Carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weekCarousel}
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((weekNum) => {
            const isSelected = weekNum === selectedWeek;
            return (
              <Pressable
                key={`wk_${weekNum}`}
                onPress={() => {
                  Haptics.selectionAsync().catch(() => {});
                  setSelectedWeek(weekNum);
                  setSelectedDayId(null);
                }}
                style={[
                  styles.weekPill,
                  isSelected && styles.weekPillActive,
                ]}
              >
                <Text
                  style={[
                    Typography.caption,
                    styles.weekPillText,
                    isSelected && styles.weekPillTextActive,
                  ]}
                >
                  Week {weekNum}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Current Topic Overview Card */}
        <GlassCard variant="elevated" style={styles.topicCard}>
          <View style={styles.topicHeader}>
            <View style={{ flex: 1 }}>
              <Badge label={`Week ${selectedWeek}`} variant="neutral" size="sm" />
              <Text style={[Typography.h2, styles.topicTitle]}>
                {currentTopic?.title || 'Data Structures'}
              </Text>
              <Text style={[Typography.subtext, styles.topicConcepts]}>
                {currentTopic?.concepts.length || 0} core concepts • 6 study days + 1 review
              </Text>
            </View>
          </View>
        </GlassCard>

        {/* Days of this Week Selector */}
        <Text style={[Typography.caption, styles.sectionHeader]}>
          STUDY DAYS (SELECT TO INSPECT)
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.daysRow}
        >
          {weekDays.map((day) => {
            const isSelected = (activeDay?.id === day.id);
            const isOverloaded =
              day.estimated_minutes > (profile?.daily_study_minutes || 60);

            return (
              <Pressable
                key={day.id}
                onPress={() => {
                  Haptics.selectionAsync().catch(() => {});
                  setSelectedDayId(day.id);
                }}
                style={[
                  styles.dayCard,
                  isSelected && styles.dayCardSelected,
                ]}
              >
                <Text style={[Typography.caption, styles.dayDate]}>
                  {format(new Date(day.calendar_date), 'EEE d')}
                </Text>
                <Text style={[Typography.bodyBold, styles.dayNum]}>
                  Day {day.day_number}
                </Text>
                <Text style={[Typography.caption, styles.dayMins]}>
                  ~{day.estimated_minutes}m
                </Text>

                {isOverloaded && (
                  <View style={styles.overloadIndicator}>
                    <Ionicons name="warning" size={12} color={Colors.dark.error} />
                  </View>
                )}
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Selected Day Task Detail */}
        {activeDay && (
          <View style={styles.dayTasksSection}>
            <View style={styles.dayDetailHeader}>
              <View>
                <Text style={[Typography.h3, { color: Colors.dark.textPrimary }]}>
                  Day {activeDay.day_number} Tasks ({format(new Date(activeDay.calendar_date), 'MMM d, yyyy')})
                </Text>
                <Text style={[Typography.caption, { color: Colors.dark.textMuted }]}>
                  {activeDay.is_weekly_review_day
                    ? 'Weekly Review & Spaced Repetition Session'
                    : `${activeDay.tasks?.length || 0} problems assigned`}
                </Text>
              </View>

              {activeDay.estimated_minutes > (profile?.daily_study_minutes || 60) && (
                <Badge label="Overload Warning" variant="hard" size="sm" />
              )}
            </View>

            {activeDay.tasks && activeDay.tasks.length > 0 ? (
              activeDay.tasks.map((task) => (
                <View key={task.id} style={styles.taskWrapper}>
                  <TaskCard
                    task={task}
                    completion={completions[task.id]}
                    onToggleDone={(notes) =>
                      toggleTaskCompletion(task.id, activeDay.id, notes)
                    }
                  />
                  <Pressable
                    onPress={() => handleMoveTaskPrompt(task.id, activeDay.id)}
                    style={styles.moveButton}
                  >
                    <Ionicons name="swap-horizontal" size={14} color={Colors.dark.textMuted} />
                    <Text style={[Typography.caption, styles.moveText]}>Move Day</Text>
                  </Pressable>
                </View>
              ))
            ) : (
              <GlassCard style={styles.emptyDayCard}>
                <Ionicons name="calendar-outline" size={28} color={Colors.dark.primary} />
                <Text style={[Typography.bodyBold, { color: Colors.dark.textPrimary, marginTop: 8 }]}>
                  {activeDay.is_weekly_review_day ? 'Sunday Comprehensive Review' : 'Rest Day'}
                </Text>
                <Text style={[Typography.subtext, { color: Colors.dark.textMuted, textAlign: 'center', marginTop: 4 }]}>
                  {activeDay.is_weekly_review_day
                    ? 'Review all problems from this week in the Revise tab.'
                    : 'Take a break or catch up on concepts.'}
                </Text>
              </GlassCard>
            )}
          </View>
        )}
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
  subtitle: {
    color: Colors.dark.textMuted,
    letterSpacing: 0.5,
  },
  title: {
    color: Colors.dark.textPrimary,
  },
  weekCarousel: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.base,
  },
  weekPill: {
    paddingHorizontal: Spacing.base,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.dark.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  weekPillActive: {
    backgroundColor: 'rgba(45, 212, 167, 0.15)',
    borderColor: Colors.dark.primary,
  },
  weekPillText: {
    color: Colors.dark.textSecondary,
    fontWeight: '600',
  },
  weekPillTextActive: {
    color: Colors.dark.primary,
    fontWeight: '700',
  },
  topicCard: {
    marginBottom: Spacing.lg,
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  topicTitle: {
    color: Colors.dark.textPrimary,
    marginTop: 6,
  },
  topicConcepts: {
    color: Colors.dark.textMuted,
    marginTop: 4,
  },
  sectionHeader: {
    color: Colors.dark.textMuted,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
  },
  daysRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  dayCard: {
    width: 84,
    backgroundColor: Colors.dark.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  dayCardSelected: {
    borderColor: Colors.dark.primary,
    backgroundColor: Colors.dark.surfaceElevated,
  },
  dayDate: {
    color: Colors.dark.textMuted,
    fontSize: 10,
  },
  dayNum: {
    color: Colors.dark.textPrimary,
    marginTop: 2,
  },
  dayMins: {
    color: Colors.dark.textSecondary,
    fontSize: 10,
    marginTop: 2,
  },
  overloadIndicator: {
    marginTop: 4,
  },
  dayTasksSection: {
    marginBottom: Spacing.xl,
  },
  dayDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  taskWrapper: {
    marginBottom: Spacing.sm,
  },
  moveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingVertical: 2,
    paddingHorizontal: Spacing.sm,
    marginTop: -8,
    marginBottom: Spacing.xs,
  },
  moveText: {
    color: Colors.dark.textMuted,
    marginLeft: 4,
    fontSize: 11,
  },
  emptyDayCard: {
    alignItems: 'center',
    padding: Spacing.xl,
  },
});
