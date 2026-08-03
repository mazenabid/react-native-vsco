import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/navigation/screen-header';
import { colors, sizes } from '@/theme/tokens';

type RoutePlaceholderProps = {
  title: string;
};

export function RoutePlaceholder({ title }: RoutePlaceholderProps) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.frame}>
        <ScreenHeader title={title} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.canvas,
  },
  frame: {
    width: '100%',
    maxWidth: sizes.maxContentWidth,
    flex: 1,
    backgroundColor: colors.canvas,
  },
});
