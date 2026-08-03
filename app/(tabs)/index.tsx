import { useState } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/navigation/screen-header';
import { ProjectTile } from '@/components/studio/project-tile';
import { IconButton } from '@/components/ui/icon-button';
import { STUDIO_PROJECTS } from '@/constants/studio-projects';
import { borders, colors, sizes, space } from '@/theme/tokens';

const GRID_GAP = space.xxs;

export default function StudioScreen() {
  const { width } = useWindowDimensions();
  const [columnCount, setColumnCount] = useState<2 | 3>(3);

  const contentWidth = Math.min(width, sizes.maxContentWidth);
  const tileSize = (contentWidth - GRID_GAP * (columnCount - 1)) / columnCount;

  function toggleGridSize() {
    setColumnCount((currentCount) => (currentCount === 3 ? 2 : 3));
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={[styles.appFrame, { maxWidth: sizes.maxContentWidth }]}>
        <ScreenHeader
          title="Studio"
          right={
            <IconButton
              label={`Show ${columnCount === 3 ? 'large' : 'small'} grid`}
              onPress={toggleGridSize}>
              <View style={styles.viewControlIcon}>
                <View style={styles.viewControlDot} />
              </View>
            </IconButton>
          }
        />

        <ScrollView
          style={styles.gallery}
          contentContainerStyle={styles.galleryContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {STUDIO_PROJECTS.map((project) => (
              <ProjectTile key={project.id} project={project} size={tileSize} />
            ))}
          </View>
        </ScrollView>
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
  appFrame: {
    width: '100%',
    flex: 1,
    backgroundColor: colors.canvas,
  },
  viewControlIcon: {
    width: sizes.viewControl,
    height: sizes.viewControl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: borders.control,
    borderColor: colors.contentPrimary,
    borderRadius: borders.radiusSmall,
  },
  viewControlDot: {
    width: sizes.viewControlDot,
    height: sizes.viewControlDot,
    borderWidth: borders.control,
    borderColor: colors.contentPrimary,
    borderRadius: sizes.viewControlDot / 2,
  },
  gallery: {
    flex: 1,
  },
  galleryContent: {
    paddingBottom: GRID_GAP,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
  },
});
