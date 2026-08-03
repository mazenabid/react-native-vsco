import Feather from '@expo/vector-icons/Feather';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/app-text';
import { colors, opacity, sizes, space } from '@/theme/tokens';

type FeatherName = ComponentProps<typeof Feather>['name'];

type TabDefinition = {
  route: string;
  label: string;
  icon: FeatherName;
};

const TABS: readonly TabDefinition[] = [
  { route: 'feed', label: 'Feed', icon: 'home' },
  { route: 'discover', label: 'Discover', icon: 'search' },
  { route: 'index', label: 'Studio', icon: 'grid' },
  { route: 'ai-lab', label: 'AI Lab', icon: 'star' },
  { route: 'profile', label: 'Profile', icon: 'smile' },
  { route: 'spaces', label: 'Spaces', icon: 'bar-chart-2' },
];

export function AppTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, sizes.navigationBottomFallback);

  return (
    <View style={styles.container}>
      <View
        accessibilityRole="tablist"
        style={[
          styles.bar,
          { minHeight: sizes.navigationContentHeight + bottomPadding, paddingBottom: bottomPadding },
        ]}>
        {state.routes.map((route, index) => {
          const definition = TABS.find((tab) => tab.route === route.name);

          if (!definition) return null;

          const isFocused = state.index === index;
          const tone = isFocused ? 'primary' : 'muted';
          const color = isFocused ? colors.contentPrimary : colors.contentMuted;
          const options = descriptors[route.key].options;

          function navigateToTab() {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          }

          function emitLongPress() {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          }

          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityLabel={options.tabBarAccessibilityLabel ?? definition.label}
              accessibilityState={{ selected: isFocused }}
              testID={options.tabBarButtonTestID}
              onPress={navigateToTab}
              onLongPress={emitLongPress}
              style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
              <Feather name={definition.icon} size={sizes.navigationIcon} color={color} />
              <AppText variant="navigationLabel" tone={tone}>
                {definition.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.canvas,
  },
  bar: {
    width: '100%',
    maxWidth: sizes.maxContentWidth,
    paddingTop: space.md,
    paddingHorizontal: space.xs,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.navigation,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: space.xs,
  },
  pressed: {
    opacity: opacity.pressed,
  },
});
