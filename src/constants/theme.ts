// Design System Tokens for DSA Journey
// Mature, refined, distraction-free aesthetic (Linear / Notion / Apple Fitness)

export const Colors = {
  dark: {
    background: '#0B0F1A',
    surface: '#121826',
    surfaceElevated: '#1A2233',
    surfaceSubtle: '#141B2D',
    border: 'rgba(255, 255, 255, 0.08)',
    borderHover: 'rgba(255, 255, 255, 0.16)',
    borderActive: 'rgba(45, 212, 167, 0.4)',
    
    // Accents
    primary: '#2DD4A7',
    primaryDark: '#14B8A6',
    primaryGlow: 'rgba(45, 212, 167, 0.15)',
    primaryGradient: ['#2DD4A7', '#14B8A6'] as const,
    
    secondary: '#6366F1',
    secondaryGlow: 'rgba(99, 102, 241, 0.15)',
    
    // Feedback & Gamification
    streak: '#F5A524',
    streakGlow: 'rgba(245, 165, 36, 0.15)',
    streakGradient: ['#F5A524', '#D97706'] as const,
    
    error: '#EF6B6B',
    errorGlow: 'rgba(239, 107, 107, 0.15)',
    
    success: '#2DD4A7',
    warning: '#F5A524',
    info: '#38BDF8',
    
    // Difficulty
    difficultyEasy: '#34D399',
    difficultyMedium: '#FBBF24',
    difficultyHard: '#F87171',
    difficultyPaid: '#A78BFA',
    
    // Typography
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    textDisabled: '#475569',
    textInverse: '#0B0F1A',
    
    // Overlays
    cardOverlay: 'rgba(18, 24, 38, 0.85)',
    modalOverlay: 'rgba(7, 10, 18, 0.85)',
  },
  light: {
    background: '#F7F8FA',
    surface: '#FFFFFF',
    surfaceElevated: '#F1F4F9',
    surfaceSubtle: '#EAEFF7',
    border: 'rgba(0, 0, 0, 0.08)',
    borderHover: 'rgba(0, 0, 0, 0.15)',
    borderActive: 'rgba(20, 184, 166, 0.5)',
    
    primary: '#0D9488',
    primaryDark: '#0F766E',
    primaryGlow: 'rgba(13, 148, 136, 0.12)',
    primaryGradient: ['#14B8A6', '#0D9488'] as const,
    
    secondary: '#4F46E5',
    secondaryGlow: 'rgba(79, 70, 229, 0.12)',
    
    streak: '#D97706',
    streakGlow: 'rgba(217, 119, 6, 0.12)',
    streakGradient: ['#F59E0B', '#D97706'] as const,
    
    error: '#DC2626',
    errorGlow: 'rgba(220, 38, 38, 0.12)',
    
    success: '#059669',
    warning: '#D97706',
    info: '#0284C7',
    
    difficultyEasy: '#059669',
    difficultyMedium: '#D97706',
    difficultyHard: '#DC2626',
    difficultyPaid: '#7C3AED',
    
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#64748B',
    textDisabled: '#94A3B8',
    textInverse: '#FFFFFF',
    
    cardOverlay: 'rgba(255, 255, 255, 0.9)',
    modalOverlay: 'rgba(15, 23, 42, 0.6)',
  }
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
};

export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
};

export const Typography = {
  h1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700' as const,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700' as const,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600' as const,
    letterSpacing: -0.2,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400' as const,
    letterSpacing: -0.1,
  },
  bodyBold: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600' as const,
    letterSpacing: -0.1,
  },
  subtext: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  caption: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500' as const,
    letterSpacing: 0.2,
  },
  numeralLarge: {
    fontSize: 42,
    lineHeight: 46,
    fontWeight: '800' as const,
    letterSpacing: -1,
  },
  numeralMedium: {
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '700' as const,
    letterSpacing: -0.5,
  },
  mono: {
    fontFamily: 'monospace',
    fontSize: 12,
    letterSpacing: 0,
  }
};
