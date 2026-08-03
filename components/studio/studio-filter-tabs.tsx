import { Pressable, StyleSheet, Text, View } from 'react-native';

export type StudioFilter = 'all' | 'edited';

type StudioFilterTabsProps = {
  value: StudioFilter;
  onChange: (value: StudioFilter) => void;
};

const FILTERS: readonly { label: string; value: StudioFilter }[] = [
  { label: 'All studies', value: 'all' },
  { label: 'Edited', value: 'edited' },
];

export function StudioFilterTabs({ value, onChange }: StudioFilterTabsProps) {
  return (
    <View accessibilityRole="tablist" style={styles.container}>
      {FILTERS.map((filter) => {
        const isSelected = filter.value === value;

        return (
          <Pressable
            key={filter.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onChange(filter.value)}
            style={({ pressed }) => [
              styles.tab,
              isSelected && styles.selectedTab,
              pressed && styles.pressed,
            ]}>
            <Text style={[styles.label, isSelected && styles.selectedLabel]}>{filter.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    padding: 4,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    gap: 4,
    borderRadius: 3,
    backgroundColor: '#E4E0D6',
  },
  tab: {
    minHeight: 38,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },
  selectedTab: {
    backgroundColor: '#171714',
  },
  label: {
    color: '#726E65',
    fontSize: 11,
    fontWeight: '600',
  },
  selectedLabel: {
    color: '#F3F1EC',
  },
  pressed: {
    opacity: 0.68,
  },
});
