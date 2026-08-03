import Feather from '@expo/vector-icons/Feather';
import type { ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type FeatherName = ComponentProps<typeof Feather>['name'];

type StudioBottomBarProps = {
  hasSelection: boolean;
};

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

const ACTION_ITEMS: readonly BarItem[] = [
  { label: 'Edit', icon: 'sliders', isActive: true },
  { label: 'Collage', icon: 'copy', isActive: true },
  { label: 'Share', icon: 'share', isActive: true },
  { label: 'More', icon: 'more-horizontal', isActive: true },
];

export function StudioBottomBar({ hasSelection }: StudioBottomBarProps) {
  const insets = useSafeAreaInsets();
  const items = hasSelection ? ACTION_ITEMS : NAVIGATION_ITEMS;
  const bottomPadding = Math.max(insets.bottom, 28);

  return (
    <View
      accessibilityRole="toolbar"
      style={[styles.bar, { minHeight: 68 + bottomPadding, paddingBottom: bottomPadding }]}>
      {items.map((item) => {
        const color = item.isActive ? '#FFFFFF' : '#7C7C7C';

        return (
          <View key={item.label} style={styles.item}>
            <Feather name={item.icon} size={26} color={color} />
            <Text style={[styles.label, { color }]}>{item.label}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    paddingTop: 11,
    paddingHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    backgroundColor: '#151515',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 14,
  },
});
