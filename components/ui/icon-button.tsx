import type { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, type PressableProps } from 'react-native';

import { opacity, sizes, space } from '@/theme/tokens';

type IconButtonProps = PropsWithChildren<
  Omit<
    PressableProps,
    'accessibilityLabel' | 'accessibilityRole' | 'children' | 'hitSlop' | 'style'
  > & {
    label: string;
  }
>;

export function IconButton({ children, label, ...props }: IconButtonProps) {
  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={space.md}
      style={({ pressed }) => [styles.control, pressed && styles.pressed]}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  control: {
    width: sizes.touchTarget,
    height: sizes.touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: opacity.pressed,
  },
});
