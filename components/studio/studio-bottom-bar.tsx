import Feather from '@expo/vector-icons/Feather';
import type { ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
  { label: 'Profile', icon: 'smile' },
  { label: 'Spaces', icon: 'layers' },
];

const ACTION_ITEMS: readonly BarItem[] = [
  { label: 'Edit', icon: 'sliders', isActive: true },
  { label: 'Collage', icon: 'copy', isActive: true },
  { label: 'Share', icon: 'share', isActive: true },
  { label: 'More', icon: 'more-horizontal', isActive: true },
];

export function StudioBottomBar({ hasSelection }: StudioBottomBarProps) {
  const items = hasSelection ? ACTION_ITEMS : NAVIGATION_ITEMS;

  return (
    <View accessibilityRole="toolbar" style={styles.bar}>
      {items.map((item) => {
        const color = item.isActive ? '#111111' : '#AAAAAA';

        return (
          <View key={item.label} style={styles.item}>
            <Feather name={item.icon} size={24} color={color} />
            <Text style={[styles.label, { color }]}>{item.label}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    minHeight: 76,
    paddingTop: 10,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#DDDDDD',
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
  },
  item: {
    minWidth: 54,
    alignItems: 'center',
    gap: 5,
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
  },
});
