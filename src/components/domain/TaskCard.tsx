import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
  TextInput,
} from 'react-native';
import { GlassCard } from '../ui/GlassCard';
import { Badge, BadgeVariant } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import { Task, TaskCompletion } from '../../db/types';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

interface TaskCardProps {
  task: Task;
  completion?: TaskCompletion;
  onToggleDone: (notes?: { approach?: string; complexity?: string; mistakes?: string }) => void;
  onReplaceWithFree?: (task: Task) => void;
  onSkip?: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  completion,
  onToggleDone,
  onReplaceWithFree,
  onSkip,
}) => {
  const isDone = !!completion;
  const [showNotes, setShowNotes] = useState(false);
  const [approach, setApproach] = useState(completion?.notes_approach || '');
  const [complexity, setComplexity] = useState(completion?.notes_complexity || '');
  const [mistakes, setMistakes] = useState(completion?.notes_mistakes || '');

  const handleCheckboxPress = () => {
    Haptics.notificationAsync(
      isDone
        ? Haptics.NotificationFeedbackType.Warning
        : Haptics.NotificationFeedbackType.Success
    ).catch(() => {});

    onToggleDone({
      approach,
      complexity,
      mistakes,
    });
  };

  const handleOpenLeetCode = () => {
    if (task.url) {
      Haptics.selectionAsync().catch(() => {});
      Linking.openURL(task.url).catch(() => {});
    }
  };

  const getDifficultyVariant = (): BadgeVariant => {
    if (task.difficulty === 'Easy') return 'easy';
    if (task.difficulty === 'Hard') return 'hard';
    return 'medium';
  };

  return (
    <GlassCard
      variant={isDone ? 'success' : 'default'}
      style={[styles.card, isDone && styles.doneCard]}
      glow={isDone}
    >
      <View style={styles.headerRow}>
        {/* Checkbox */}
        <Pressable
          onPress={handleCheckboxPress}
          hitSlop={8}
          style={[styles.checkbox, isDone && styles.checkboxActive]}
        >
          {isDone ? (
            <Ionicons name="checkmark" size={16} color="#042F2E" />
          ) : (
            <View style={styles.checkboxInner} />
          )}
        </Pressable>

        {/* Title and Badges */}
        <View style={styles.titleColumn}>
          <View style={styles.badgeRow}>
            <Badge label={task.difficulty} variant={getDifficultyVariant()} size="sm" />
            {task.is_paid_only && (
              <Badge label="Premium" variant="paid" size="sm" style={styles.badgeMargin} />
            )}
            {task.status === 'bonus' && (
              <Badge label="Bonus Practice" variant="bonus" size="sm" style={styles.badgeMargin} />
            )}
            {task.status === 'needs_link' && (
              <Badge label="Needs Link" variant="neutral" size="sm" style={styles.badgeMargin} />
            )}
          </View>

          <Text
            style={[
              Typography.bodyBold,
              styles.taskTitle,
              isDone && styles.taskTitleDone,
            ]}
          >
            {task.title}
          </Text>
        </View>

        {/* Actions Dropdown Toggle */}
        <Pressable
          onPress={() => setShowNotes(!showNotes)}
          style={styles.notesToggle}
          hitSlop={8}
        >
          <Ionicons
            name={showNotes ? 'chevron-up' : 'create-outline'}
            size={18}
            color={showNotes ? Colors.dark.primary : Colors.dark.textMuted}
          />
        </Pressable>
      </View>

      {/* Paid-only Options Notice */}
      {task.is_paid_only && !isDone && (
        <View style={styles.premiumBanner}>
          <Ionicons name="lock-closed" size={14} color={Colors.dark.difficultyPaid} />
          <Text style={[Typography.caption, styles.premiumText]}>
            Requires LeetCode Premium subscription.
          </Text>
          <View style={styles.premiumActions}>
            {onSkip && (
              <Button
                title="Skip"
                onPress={() => onSkip(task)}
                variant="ghost"
                size="sm"
                style={{ height: 28, paddingHorizontal: 8 }}
              />
            )}
            {onReplaceWithFree && (
              <Button
                title="Free Alternative"
                onPress={() => onReplaceWithFree(task)}
                variant="outline"
                size="sm"
                style={{ height: 28, paddingHorizontal: 8 }}
              />
            )}
          </View>
        </View>
      )}

      {/* Action Row */}
      <View style={styles.actionRow}>
        {task.url ? (
          <Pressable onPress={handleOpenLeetCode} style={styles.linkButton}>
            <Ionicons name="open-outline" size={14} color={Colors.dark.primary} />
            <Text style={[Typography.caption, styles.linkText]}>Open in LeetCode</Text>
          </Pressable>
        ) : null}

        <Pressable
          onPress={handleCheckboxPress}
          style={[styles.markDoneButton, isDone && styles.markDoneButtonActive]}
        >
          <Ionicons
            name={isDone ? 'checkmark-circle' : 'checkmark-circle-outline'}
            size={15}
            color={isDone ? Colors.dark.primary : Colors.dark.textSecondary}
          />
          <Text
            style={[
              Typography.caption,
              styles.markDoneText,
              isDone && { color: Colors.dark.primary, fontWeight: '700' },
            ]}
          >
            {isDone ? 'Completed' : 'Mark Done'}
          </Text>
        </Pressable>
      </View>

      {/* Expandable Notes Drawer */}
      {showNotes && (
        <View style={styles.notesDrawer}>
          <Text style={[Typography.caption, styles.drawerTitle]}>SOLVER'S NOTEBOOK</Text>

          <TextInput
            style={styles.notesInput}
            placeholder="Core Idea / Approach pattern..."
            placeholderTextColor={Colors.dark.textDisabled}
            value={approach}
            onChangeText={setApproach}
            multiline
          />

          <View style={styles.complexityRow}>
            <TextInput
              style={[styles.notesInput, styles.complexityInput]}
              placeholder="Time: O(N)"
              placeholderTextColor={Colors.dark.textDisabled}
              value={complexity}
              onChangeText={setComplexity}
            />
            <TextInput
              style={[styles.notesInput, styles.complexityInput]}
              placeholder="Space: O(1)"
              placeholderTextColor={Colors.dark.textDisabled}
              value={mistakes}
              onChangeText={setMistakes}
            />
          </View>

          <Button
            title="Save Notes"
            onPress={() => {
              Haptics.selectionAsync().catch(() => {});
              onToggleDone({ approach, complexity, mistakes });
              setShowNotes(false);
            }}
            variant="secondary"
            size="sm"
            style={{ marginTop: Spacing.sm }}
          />
        </View>
      )}
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.md,
  },
  doneCard: {
    borderColor: 'rgba(45, 212, 167, 0.4)',
    backgroundColor: 'rgba(18, 24, 38, 0.95)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Colors.dark.borderHover,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    marginTop: 2,
  },
  checkboxActive: {
    backgroundColor: Colors.dark.primary,
    borderColor: Colors.dark.primary,
  },
  checkboxInner: {
    width: 6,
    height: 6,
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
  titleColumn: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  badgeMargin: {
    marginLeft: 6,
  },
  taskTitle: {
    color: Colors.dark.textPrimary,
  },
  taskTitleDone: {
    color: Colors.dark.textMuted,
    textDecorationLine: 'line-through',
  },
  notesToggle: {
    padding: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  premiumBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(167, 139, 250, 0.1)',
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    marginTop: Spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.25)',
  },
  premiumText: {
    color: Colors.dark.textSecondary,
    marginLeft: 6,
    flex: 1,
  },
  premiumActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    color: Colors.dark.primary,
    marginLeft: 4,
    fontWeight: '600',
  },
  markDoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  markDoneButtonActive: {
    opacity: 0.9,
  },
  markDoneText: {
    color: Colors.dark.textSecondary,
    marginLeft: 4,
  },
  notesDrawer: {
    marginTop: Spacing.md,
    backgroundColor: Colors.dark.surfaceSubtle,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
  },
  drawerTitle: {
    color: Colors.dark.textMuted,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  notesInput: {
    backgroundColor: Colors.dark.surfaceElevated,
    borderColor: Colors.dark.border,
    borderWidth: 1,
    borderRadius: BorderRadius.sm,
    padding: Spacing.sm,
    color: Colors.dark.textPrimary,
    fontSize: 13,
    marginBottom: Spacing.sm,
  },
  complexityRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  complexityInput: {
    flex: 1,
    marginBottom: 0,
  },
});
