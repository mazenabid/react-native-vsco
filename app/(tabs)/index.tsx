import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StudioBottomBar } from '@/components/studio/studio-bottom-bar';
import { ProjectTile } from '@/components/studio/project-tile';
import { AppText } from '@/components/ui/app-text';
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
        <View style={styles.header}>
          <View style={styles.utilityRow}>
            <View style={styles.menuPlaceholder} accessibilityElementsHidden>
              <Feather name="menu" size={sizes.menuIcon} color={colors.contentPrimary} />
            </View>

            <IconButton
              label={`Show ${columnCount === 3 ? 'large' : 'small'} grid`}
              onPress={toggleGridSize}>
              <View style={styles.viewControlIcon}>
                <View style={styles.viewControlDot} />
              </View>
            </IconButton>
          </View>

          <View style={styles.titleRow}>
            <AppText variant="screenTitle">Studio</AppText>
          </View>
        </View>

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

        <StudioBottomBar />
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
  menuPlaceholder: {
    width: sizes.touchTarget,
    height: sizes.touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
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
  titleRow: {
    marginTop: space.xxl,
    paddingHorizontal: space.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
