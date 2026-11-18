import React from 'react';
import {
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
  View,
} from 'react-native';
import { Colors, BorderRadius, Spacing, Typography } from '../../constants/theme';
import * as Haptics from 'expo-haptics';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
}) => {
  const handlePress = () => {
    if (disabled || loading) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    onPress();
  };

  const getContainerStyle = (): ViewStyle => {
    const heightMap = { sm: 36, md: 46, lg: 54 };
    const paddingXMap = { sm: Spacing.md, md: Spacing.base, lg: Spacing.xl };

    let bg = Colors.dark.surfaceElevated;
    let border = 'transparent';
    let borderWidth = 0;

    if (variant === 'primary') {
      bg = Colors.dark.primaryDark;
    } else if (variant === 'secondary') {
      bg = Colors.dark.surfaceElevated;
      border = Colors.dark.border;
      borderWidth = 1;
    } else if (variant === 'outline') {
      bg = 'transparent';
      border = Colors.dark.primary;
      borderWidth = 1;
    } else if (variant === 'ghost') {
      bg = 'transparent';
    } else if (variant === 'danger') {
      bg = 'rgba(239, 107, 107, 0.15)';
      border = 'rgba(239, 107, 107, 0.4)';
      borderWidth = 1;
    }

    if (disabled) {
      bg = 'rgba(255, 255, 255, 0.05)';
      border = 'transparent';
    }

    return {
      height: heightMap[size],
      paddingHorizontal: paddingXMap[size],
      backgroundColor: bg,
      borderColor: border,
      borderWidth,
      borderRadius: BorderRadius.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    };
  };

  const getTextColor = (): string => {
    if (disabled) return Colors.dark.textDisabled;
    if (variant === 'primary') return '#042F2E';
    if (variant === 'danger') return Colors.dark.error;
    if (variant === 'outline') return Colors.dark.primary;
    return Colors.dark.textPrimary;
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        getContainerStyle(),
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <View style={styles.content}>
          {icon && iconPosition === 'left' && (
            <View style={styles.iconLeft}>{icon}</View>
          )}
          <Text
            style={[
              Typography.bodyBold,
              { color: getTextColor() },
              size === 'sm' && { fontSize: 13 },
              size === 'lg' && { fontSize: 16 },
              textStyle,
            ]}
          >
            {title}
          </Text>
          {icon && iconPosition === 'right' && (
            <View style={styles.iconRight}>{icon}</View>
          )}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  iconLeft: {
    marginRight: Spacing.sm,
  },
  iconRight: {
    marginLeft: Spacing.sm,
  },
});
