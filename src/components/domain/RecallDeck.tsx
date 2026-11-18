import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import { RevisionItem, RevisionRating } from '../../db/types';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

interface RecallDeckProps {
  items: RevisionItem[];
  onRateItem: (taskId: string, rating: RevisionRating) => void;
  onCompleteSession: () => void;
}

export const RecallDeck: React.FC<RecallDeckProps> = ({
  items,
  onRateItem,
  onCompleteSession,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(600); // 10 minutes (600s)
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsRemaining]);

  const currentItem = items[currentIndex];

  const handleReveal = () => {
    Haptics.selectionAsync().catch(() => {});
    setIsRevealed(true);
  };

  const handleRate = (rating: RevisionRating) => {
    if (!currentItem) return;
    Haptics.impactAsync(
      rating === 'solid'
        ? Haptics.ImpactFeedbackStyle.Medium
        : Haptics.ImpactFeedbackStyle.Light
    ).catch(() => {});

    onRateItem(currentItem.task_id, rating);
    setIsRevealed(false);

    if (currentIndex + 1 < items.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsTimerRunning(false);
      onCompleteSession();
    }
  };

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentItem || items.length === 0) {
    return (
      <GlassCard variant="success" style={styles.completedCard}>
        <View style={styles.completedHeader}>
          <Ionicons name="checkmark-circle" size={28} color={Colors.dark.primary} />
          <View style={{ marginLeft: Spacing.sm }}>
            <Text style={[Typography.h3, { color: Colors.dark.textPrimary }]}>
              10-Minute Recall Done
            </Text>
            <Text style={[Typography.subtext, { color: Colors.dark.textMuted }]}>
              Yesterday's concepts reinforced. Ready for today's new problems.
            </Text>
          </View>
        </View>
      </GlassCard>
    );
  }

  const difficultyVariant =
    currentItem.task?.difficulty === 'Easy'
      ? 'easy'
      : currentItem.task?.difficulty === 'Hard'
      ? 'hard'
      : 'medium';

  return (
    <GlassCard variant="elevated" style={styles.deckCard} glow>
      {/* Top Bar with 10:00 Countdown */}
      <View style={styles.topRow}>
        <View style={styles.counterRow}>
          <Ionicons name="flash" size={16} color={Colors.dark.streak} />
          <Text style={[Typography.caption, styles.counterText]}>
            Recall Card {currentIndex + 1} of {items.length}
          </Text>
        </View>

        <View
          style={[
            styles.timerPill,
            secondsRemaining < 120 && styles.timerPillWarning,
          ]}
        >
          <Ionicons
            name="time-outline"
            size={14}
            color={
              secondsRemaining < 120 ? Colors.dark.error : Colors.dark.primary
            }
          />
          <Text
            style={[
              Typography.mono,
              styles.timerText,
              secondsRemaining < 120 && { color: Colors.dark.error },
            ]}
          >
            {formatTimer(secondsRemaining)}
          </Text>
        </View>
      </View>

      {/* Card Content */}
      <View style={styles.problemInfo}>
        <View style={styles.badgeRow}>
          <Badge
            label={currentItem.task?.difficulty || 'Medium'}
            variant={difficultyVariant}
          />
          <Text style={[Typography.caption, styles.recallSub]}>
            Yesterday's Problem
          </Text>
        </View>

        <Text style={[Typography.h2, styles.problemTitle]}>
          {currentItem.task?.title || 'Problem Title'}
        </Text>
      </View>

      {/* Front / Back Reveal Area */}
      {!isRevealed ? (
        <View style={styles.hiddenArea}>
          <Text style={[Typography.body, styles.promptText]}>
            Mentally recall: What was the core pattern, time complexity, and edge cases?
          </Text>
          <Button
            title="Reveal My Approach"
            onPress={handleReveal}
            variant="outline"
            size="md"
            icon={<Ionicons name="eye-outline" size={18} color={Colors.dark.primary} />}
          />
        </View>
      ) : (
        <View style={styles.revealedArea}>
          <View style={styles.notesBox}>
            <Text style={[Typography.caption, styles.notesLabel]}>YOUR SAVED APPROACH:</Text>
            <Text style={[Typography.body, styles.notesText]}>
              {currentItem.completion?.notes_approach ||
                'Optimal pattern: Two pointers / Hash Map. In-place state tracking with single pass.'}
            </Text>
            {currentItem.completion?.notes_complexity && (
              <Text style={[Typography.caption, styles.notesSub]}>
                Complexity: {currentItem.completion.notes_complexity}
              </Text>
            )}
          </View>

          <Text style={[Typography.subtext, styles.ratePrompt]}>
            How confident was your mental recall?
          </Text>

          <View style={styles.buttonRow}>
            <Button
              title="Forgot (1d)"
              onPress={() => handleRate('forgot')}
              variant="danger"
              size="sm"
              style={styles.rateButton}
            />
            <Button
              title="Shaky (3d)"
              onPress={() => handleRate('shaky')}
              variant="secondary"
              size="sm"
              style={styles.rateButton}
            />
            <Button
              title="Solid (7d)"
              onPress={() => handleRate('solid')}
              variant="primary"
              size="sm"
              style={styles.rateButton}
            />
          </View>
        </View>
      )}
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  deckCard: {
    marginBottom: Spacing.base,
    borderWidth: 1.5,
    borderColor: 'rgba(45, 212, 167, 0.3)',
  },
  completedCard: {
    marginBottom: Spacing.base,
    padding: Spacing.md,
  },
  completedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterText: {
    color: Colors.dark.textMuted,
    marginLeft: 4,
  },
  timerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(45, 212, 167, 0.1)',
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: 'rgba(45, 212, 167, 0.3)',
  },
  timerPillWarning: {
    backgroundColor: 'rgba(239, 107, 107, 0.15)',
    borderColor: 'rgba(239, 107, 107, 0.4)',
  },
  timerText: {
    color: Colors.dark.primary,
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '700',
  },
  problemInfo: {
    marginBottom: Spacing.base,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  recallSub: {
    color: Colors.dark.textMuted,
    marginLeft: Spacing.sm,
  },
  problemTitle: {
    color: Colors.dark.textPrimary,
    marginTop: 4,
  },
  hiddenArea: {
    paddingVertical: Spacing.sm,
  },
  promptText: {
    color: Colors.dark.textSecondary,
    marginBottom: Spacing.base,
  },
  revealedArea: {
    marginTop: Spacing.xs,
  },
  notesBox: {
    backgroundColor: Colors.dark.surfaceSubtle,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.dark.primary,
  },
  notesLabel: {
    color: Colors.dark.textMuted,
    fontWeight: '700',
    marginBottom: 4,
  },
  notesText: {
    color: Colors.dark.textPrimary,
  },
  notesSub: {
    color: Colors.dark.textSecondary,
    marginTop: 6,
  },
  ratePrompt: {
    color: Colors.dark.textMuted,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  rateButton: {
    flex: 1,
  },
});
