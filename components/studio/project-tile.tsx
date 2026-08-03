import { Pressable, StyleSheet, Text, View } from 'react-native';

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
      accessibilityLabel={`${project.title}, ${project.isEdited ? 'edited' : 'unedited'} study`}
      accessibilityState={{ selected: isSelected }}
      onPress={() => onPress(project.id)}
      style={({ pressed }) => [
        styles.container,
        { width: size },
        isSelected && styles.selected,
        pressed && styles.pressed,
      ]}>
      <View style={[styles.artwork, { width: size - 4, height: size * 1.18 }]}>
        <View style={[StyleSheet.absoluteFill, { backgroundColor: project.palette.base }]} />
        <View
          style={[
            styles.sun,
            {
              width: size * 0.44,
              height: size * 0.44,
              borderRadius: size * 0.22,
              backgroundColor: project.palette.light,
              top: size * project.composition.sunTop,
              left: size * project.composition.sunLeft,
            },
          ]}
        />
        <View
          style={[
            styles.horizon,
            {
              height: size * project.composition.horizonHeight,
              backgroundColor: project.palette.dark,
            },
          ]}
        />
        <View style={[styles.frame, { borderColor: project.palette.line }]} />
        <Text style={[styles.artworkIndex, { color: project.palette.line }]}>{project.index}</Text>
      </View>

      <View style={styles.meta}>
        <View style={styles.titleRow}>
          <Text numberOfLines={1} style={styles.title}>
            {project.title}
          </Text>
          {project.isEdited ? <View style={styles.editedDot} /> : null}
        </View>
        <Text style={styles.date}>{project.updatedAt}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 3,
  },
  selected: {
    borderColor: '#171714',
  },
  pressed: {
    opacity: 0.72,
  },
  artwork: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 1,
  },
  sun: {
    position: 'absolute',
  },
  horizon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    transform: [{ skewY: '-5deg' }, { scaleX: 1.08 }],
  },
  frame: {
    position: 'absolute',
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
    borderWidth: StyleSheet.hairlineWidth,
    opacity: 0.7,
  },
  artworkIndex: {
    position: 'absolute',
    top: 16,
    left: 16,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  meta: {
    paddingTop: 10,
    paddingBottom: 8,
    paddingHorizontal: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  title: {
    flex: 1,
    color: '#22221E',
    fontSize: 12,
    fontWeight: '600',
  },
  editedDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#D36B46',
  },
  date: {
    marginTop: 4,
    color: '#918D83',
    fontSize: 9,
    letterSpacing: 0.3,
  },
});
