import Feather from '@expo/vector-icons/Feather';
import type { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/app-text';
import { colors, sizes, space } from '@/theme/tokens';

type FeatherName = ComponentProps<typeof Feather>['name'];

type BarItem = {
  label: string;
  icon: FeatherName;
  isActive?: boolean;
};

const NAVIGATION_ITEMS: readonly BarItem[] = [
  { label: 'Feed', icon: 'home' },
  { label: 'Discover', icon: 'search' },
  { label: 'Studio', icon: 'grid', isActive: true },
  { label: 'AI Lab', icon: 'star' },
  { label: 'Profile', icon: 'smile' },
  { label: 'Spaces', icon: 'bar-chart-2' },
];

export function StudioBottomBar() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, sizes.navigationBottomFallback);

  return (
    <View
      accessibilityRole="toolbar"
      style={[
        styles.bar,
        { minHeight: sizes.navigationContentHeight + bottomPadding, paddingBottom: bottomPadding },
      ]}>
      {NAVIGATION_ITEMS.map((item) => {
        const tone = item.isActive ? 'primary' : 'muted';
        const color = item.isActive ? colors.contentPrimary : colors.contentMuted;

        return (
          <View key={item.label} style={styles.item}>
            <Feather name={item.icon} size={sizes.navigationIcon} color={color} />
            <AppText variant="navigationLabel" tone={tone}>
              {item.label}
            </AppText>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    paddingTop: space.md,
    paddingHorizontal: space.xs,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    backgroundColor: colors.navigation,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: space.xs,
  },
});
