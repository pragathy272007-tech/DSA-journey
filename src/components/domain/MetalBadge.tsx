import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export type MetalTier = 'bronze' | 'silver' | 'gold' | 'platinum';

interface MetalBadgeProps {
  tier: MetalTier;
  title: string;
  requirement: string;
  unlocked: boolean;
  currentCount: number;
  targetCount: number;
}

export const MetalBadge: React.FC<MetalBadgeProps> = ({
  tier,
  title,
  requirement,
  unlocked,
  currentCount,
  targetCount,
}) => {
  const getTierColors = () => {
    switch (tier) {
      case 'bronze':
        return {
          glow: 'rgba(217, 119, 6, 0.25)',
          border: 'rgba(217, 119, 6, 0.5)',
          accent: '#D97706',
          bg: '#1C150E',
        };
      case 'silver':
        return {
          glow: 'rgba(203, 213, 225, 0.25)',
          border: 'rgba(203, 213, 225, 0.5)',
          accent: '#CBD5E1',
          bg: '#161B26',
        };
      case 'gold':
        return {
          glow: 'rgba(245, 165, 36, 0.3)',
          border: 'rgba(245, 165, 36, 0.6)',
          accent: '#F5A524',
          bg: '#201A0E',
        };
      case 'platinum':
        return {
          glow: 'rgba(45, 212, 167, 0.35)',
          border: 'rgba(45, 212, 167, 0.6)',
          accent: '#2DD4A7',
          bg: '#0F2321',
        };
    }
  };

  const { glow, border, accent, bg } = getTierColors();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: unlocked ? bg : Colors.dark.surfaceSubtle,
          borderColor: unlocked ? border : Colors.dark.border,
          opacity: unlocked ? 1 : 0.65,
        },
      ]}
    >
      <View
        style={[
          styles.iconCircle,
          {
            backgroundColor: unlocked ? glow : 'rgba(255, 255, 255, 0.04)',
            borderColor: unlocked ? border : Colors.dark.border,
          },
        ]}
      >
        <Ionicons
          name={unlocked ? 'ribbon' : 'lock-closed'}
          size={24}
          color={unlocked ? accent : Colors.dark.textDisabled}
        />
      </View>

      <View style={styles.content}>
        <Text style={[Typography.bodyBold, styles.title, { color: unlocked ? Colors.dark.textPrimary : Colors.dark.textSecondary }]}>
          {title}
        </Text>
        <Text style={[Typography.caption, styles.requirement]}>{requirement}</Text>

        <View style={styles.progressRow}>
          <View style={styles.track}>
            <View
              style={[
                styles.fill,
                {
                  width: `${Math.min(100, (currentCount / targetCount) * 100)}%`,
                  backgroundColor: unlocked ? accent : Colors.dark.textDisabled,
                },
              ]}
            />
          </View>
          <Text style={[Typography.caption, styles.progressText]}>
            {currentCount}/{targetCount}d
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
  },
  requirement: {
    color: Colors.dark.textMuted,
    marginTop: 2,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  track: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginRight: Spacing.sm,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    color: Colors.dark.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
});
