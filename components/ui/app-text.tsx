import { StyleSheet, Text, type TextProps } from 'react-native';

import { colors, typography } from '@/theme/tokens';

type AppTextVariant = keyof typeof typography;
type AppTextTone = 'primary' | 'muted' | 'inverse';

type AppTextProps = TextProps & {
  variant: AppTextVariant;
  tone?: AppTextTone;
};

export function AppText({ variant, tone = 'primary', style, ...props }: AppTextProps) {
  return <Text {...props} style={[styles[variant], tones[tone], style]} />;
}

const styles = StyleSheet.create(typography);

const tones = StyleSheet.create({
  primary: {
    color: colors.contentPrimary,
  },
  muted: {
    color: colors.contentMuted,
  },
  inverse: {
    color: colors.contentInverse,
  },
});
