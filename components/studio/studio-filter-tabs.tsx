import { ScrollView, Pressable, StyleSheet, Text } from 'react-native';

export type StudioFilter = 'all' | 'edited' | 'unedited';

type StudioFilterTabsProps = {
  value: StudioFilter;
  onChange: (value: StudioFilter) => void;
};

const FILTERS: readonly { label: string; value: StudioFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Edited', value: 'edited' },
  { label: 'Unedited', value: 'unedited' },
];

export function StudioFilterTabs({ value, onChange }: StudioFilterTabsProps) {
  return (
    <ScrollView
      horizontal
      accessibilityRole="tablist"
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}>
      {FILTERS.map((filter) => {
        const isSelected = filter.value === value;

        return (
          <Pressable
            key={filter.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onChange(filter.value)}
            style={({ pressed }) => [
              styles.filter,
              isSelected && styles.selectedFilter,
              pressed && styles.pressed,
            ]}>
            <Text style={[styles.label, isSelected && styles.selectedLabel]}>{filter.label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    paddingHorizontal: 20,
    gap: 10,
  },
  filter: {
    minHeight: 42,
    minWidth: 78,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#111111',
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
  },
  selectedFilter: {
    backgroundColor: '#111111',
  },
  label: {
    color: '#111111',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedLabel: {
    color: '#FFFFFF',
  },
  pressed: {
    opacity: 0.5,
  },
});
