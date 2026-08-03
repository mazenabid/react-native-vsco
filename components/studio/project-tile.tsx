import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import type { StudioProject } from '@/constants/studio-projects';
import { colors, motion } from '@/theme/tokens';

type ProjectTileProps = {
  project: StudioProject;
  size: number;
};

export function ProjectTile({ project, size }: ProjectTileProps) {
  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={`${project.title} demo photo`}
      style={[styles.tile, { width: size, height: size }]}>
      <Image
        source={{ uri: project.imageUrl }}
        style={styles.image}
        contentFit="cover"
        transition={motion.imageReveal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: colors.mediaPlaceholder,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
