import { DarkTheme, type Theme } from '@react-navigation/native';

import { colors } from '@/theme/tokens';

export const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.canvas,
    card: colors.navigation,
    text: colors.contentPrimary,
    border: colors.borderSubtle,
    primary: colors.contentPrimary,
  },
} satisfies Theme;
