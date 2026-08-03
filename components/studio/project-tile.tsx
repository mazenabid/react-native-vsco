import Feather from '@expo/vector-icons/Feather';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import type { StudioProject } from '@/constants/studio-projects';

type ProjectTileProps = {
  project: StudioProject;
  size: number;
  isSelected: boolean;
  onPress: (projectId: string) => void;
};

export function ProjectTile({ project, size, isSelected, onPress }: ProjectTileProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${project.title}, ${project.isEdited ? 'edited' : 'unedited'} photo`}
      accessibilityState={{ selected: isSelected }}
      onPress={() => onPress(project.id)}
      style={({ pressed }) => [
        styles.tile,
        { width: size, height: size },
        isSelected && styles.selectedTile,
        pressed && styles.pressed,
      ]}>
      <Image
        source={{ uri: project.imageUrl }}
        style={styles.image}
        contentFit="cover"
        transition={160}
      />

      {project.isEdited ? (
        <View style={styles.editedBadge}>
          <Feather name="sliders" color="#111111" size={12} />
        </View>
      ) : null}

      {isSelected ? <View style={styles.selectionDot} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#E8E8E8',
  },
  selectedTile: {
    padding: 4,
    borderWidth: 3,
    borderColor: '#111111',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  editedBadge: {
    position: 'absolute',
    right: 7,
    bottom: 7,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  selectionDot: {
    position: 'absolute',
    right: 9,
    bottom: 9,
    width: 26,
    height: 26,
    borderWidth: 6,
    borderColor: '#111111',
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
  },
  pressed: {
    opacity: 0.72,
  },
});
