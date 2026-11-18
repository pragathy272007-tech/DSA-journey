import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, Pressable } from 'react-native';
import { Colors, BorderRadius, Spacing } from '../../constants/theme';
import * as Haptics from 'expo-haptics';

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'subtle' | 'active' | 'success';
  glow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  onPress,
  variant = 'default',
  glow = false,
}) => {
  const handlePress = () => {
    if (onPress) {
      Haptics.selectionAsync().catch(() => {});
      onPress();
    }
  };

  const getBackgroundColor = () => {
    switch (variant) {
      case 'elevated':
        return Colors.dark.surfaceElevated;
      case 'subtle':
        return Colors.dark.surfaceSubtle;
      case 'active':
        return 'rgba(45, 212, 167, 0.08)';
      case 'success':
        return 'rgba(45, 212, 167, 0.12)';
      default:
        return Colors.dark.surface;
    }
  };

  const getBorderColor = () => {
    switch (variant) {
      case 'active':
        return Colors.dark.borderActive;
      case 'success':
        return 'rgba(45, 212, 167, 0.5)';
      default:
        return Colors.dark.border;
    }
  };

  const cardStyle: ViewStyle = {
    backgroundColor: getBackgroundColor(),
    borderColor: getBorderColor(),
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    ...(glow && {
      shadowColor: Colors.dark.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 12,
      elevation: 4,
    }),
  };

  if (onPress) {
    return (
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.base,
          cardStyle,
          pressed && styles.pressed,
          style,
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={[styles.base, cardStyle, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
});
