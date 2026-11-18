import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, BorderRadius, Spacing, Typography } from '../../constants/theme';

export type BadgeVariant =
  | 'easy'
  | 'medium'
  | 'hard'
  | 'paid'
  | 'bonus'
  | 'streak'
  | 'neutral'
  | 'success';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'neutral',
  size = 'sm',
  style,
}) => {
  const getColors = (): { bg: string; text: string; border: string } => {
    switch (variant) {
      case 'easy':
        return {
          bg: 'rgba(52, 211, 153, 0.12)',
          text: Colors.dark.difficultyEasy,
          border: 'rgba(52, 211, 153, 0.3)',
        };
      case 'medium':
        return {
          bg: 'rgba(251, 191, 36, 0.12)',
          text: Colors.dark.difficultyMedium,
          border: 'rgba(251, 191, 36, 0.3)',
        };
      case 'hard':
        return {
          bg: 'rgba(248, 113, 113, 0.12)',
          text: Colors.dark.difficultyHard,
          border: 'rgba(248, 113, 113, 0.3)',
        };
      case 'paid':
        return {
          bg: 'rgba(167, 139, 250, 0.15)',
          text: Colors.dark.difficultyPaid,
          border: 'rgba(167, 139, 250, 0.4)',
        };
      case 'bonus':
        return {
          bg: 'rgba(99, 102, 241, 0.12)',
          text: Colors.dark.secondary,
          border: 'rgba(99, 102, 241, 0.3)',
        };
      case 'streak':
        return {
          bg: 'rgba(245, 165, 36, 0.15)',
          text: Colors.dark.streak,
          border: 'rgba(245, 165, 36, 0.4)',
        };
      case 'success':
        return {
          bg: 'rgba(45, 212, 167, 0.12)',
          text: Colors.dark.primary,
          border: 'rgba(45, 212, 167, 0.3)',
        };
      default:
        return {
          bg: Colors.dark.surfaceElevated,
          text: Colors.dark.textSecondary,
          border: Colors.dark.border,
        };
    }
  };

  const { bg, text, border } = getColors();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: bg,
          borderColor: border,
          paddingVertical: size === 'sm' ? 2 : 4,
          paddingHorizontal: size === 'sm' ? Spacing.sm : Spacing.md,
        },
        style,
      ]}
    >
      <Text
        style={[
          Typography.caption,
          {
            color: text,
            fontSize: size === 'sm' ? 11 : 12,
            fontWeight: '600',
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
