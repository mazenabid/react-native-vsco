import Feather from '@expo/vector-icons/Feather';
import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { colors, sizes, space } from '@/theme/tokens';

type ScreenHeaderProps = {
  title: string;
  right?: ReactNode;
};

export function ScreenHeader({ title, right }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.utilityRow}>
        <View style={styles.utilitySlot} accessibilityElementsHidden>
          <Feather name="menu" size={sizes.menuIcon} color={colors.contentPrimary} />
        </View>
        <View style={styles.utilitySlot}>{right}</View>
      </View>

      <View style={styles.titleRow}>
        <AppText variant="screenTitle">{title}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: space.md,
    paddingBottom: space.lg + space.xxs,
  },
  utilityRow: {
    height: sizes.utilityRowHeight,
    paddingHorizontal: space.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  utilitySlot: {
    width: sizes.touchTarget,
    height: sizes.touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: {
    marginTop: space.xxl,
    paddingHorizontal: space.lg,
  },
});
