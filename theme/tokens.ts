import type { TextStyle } from 'react-native';

export const colors = {
  canvas: '#000000',
  navigation: '#151515',
  mediaPlaceholder: '#1A1A1A',
  borderSubtle: '#292929',
  contentPrimary: '#FFFFFF',
  contentMuted: '#7C7C7C',
  contentInverse: '#000000',
} as const;

export const space = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 20,
  xl: 28,
  xxl: 34,
} as const;

export const sizes = {
  maxContentWidth: 720,
  touchTarget: 44,
  menuIcon: 36,
  utilityRowHeight: 48,
  viewControl: 24,
  viewControlDot: 6,
  navigationIcon: 26,
  navigationContentHeight: 68,
  navigationBottomFallback: 28,
} as const;

export const borders = {
  control: 2,
  radiusSmall: 2,
} as const;

export const opacity = {
  pressed: 0.5,
} as const;

export const motion = {
  imageReveal: 160,
} as const;

export const typography = {
  screenTitle: {
    fontSize: 32,
    fontWeight: '500',
    letterSpacing: -0.9,
    lineHeight: 40,
  },
  navigationLabel: {
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 14,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: '400',
    letterSpacing: -0.4,
    lineHeight: 32,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 23,
  },
  buttonLabel: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.4,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
} satisfies Record<string, TextStyle>;
