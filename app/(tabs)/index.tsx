import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StudioBottomBar } from '@/components/studio/studio-bottom-bar';
import { ProjectTile } from '@/components/studio/project-tile';
import { StudioFilterTabs, type StudioFilter } from '@/components/studio/studio-filter-tabs';
import { STUDIO_PROJECTS } from '@/constants/studio-projects';

const MAX_CONTENT_WIDTH = 720;
const GRID_GAP = 2;

export default function StudioScreen() {
  const { width } = useWindowDimensions();
  const [filter, setFilter] = useState<StudioFilter>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [columnCount, setColumnCount] = useState<2 | 3>(3);

  const contentWidth = Math.min(width, MAX_CONTENT_WIDTH);
  const tileSize = (contentWidth - GRID_GAP * (columnCount - 1)) / columnCount;
  const visibleProjects = STUDIO_PROJECTS.filter((project) => {
    if (filter === 'edited') return project.isEdited;
    if (filter === 'unedited') return !project.isEdited;
    return true;
  });

  function selectFilter(nextFilter: StudioFilter) {
    setFilter(nextFilter);
    setSelectedProjectId(null);
  }

  function selectProject(projectId: string) {
    setSelectedProjectId((currentId) => (currentId === projectId ? null : projectId));
  }

  function toggleGridSize() {
    setColumnCount((currentCount) => (currentCount === 3 ? 2 : 3));
  }

  const hasSelection = selectedProjectId !== null;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={[styles.appFrame, { maxWidth: MAX_CONTENT_WIDTH }]}>
        {hasSelection ? (
          <View style={styles.selectionHeader}>
            <Text style={styles.selectionCount}>1 selected</Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => setSelectedProjectId(null)}
              style={({ pressed }) => [styles.deselectButton, pressed && styles.pressed]}>
              <Text style={styles.deselectText}>Deselect</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>Studio</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Show ${columnCount === 3 ? 'large' : 'small'} grid`}
                onPress={toggleGridSize}
                hitSlop={12}
                style={({ pressed }) => [styles.gridButton, pressed && styles.pressed]}>
                <Feather name="grid" size={25} color="#111111" />
              </Pressable>
            </View>
            <StudioFilterTabs value={filter} onChange={selectFilter} />
          </View>
        )}

        <ScrollView
          style={styles.gallery}
          contentContainerStyle={styles.galleryContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {visibleProjects.map((project) => (
              <ProjectTile
                key={project.id}
                project={project}
                size={tileSize}
                isSelected={project.id === selectedProjectId}
                onPress={selectProject}
              />
            ))}
          </View>
        </ScrollView>

        <StudioBottomBar hasSelection={hasSelection} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },
  appFrame: {
    width: '100%',
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 18,
  },
  titleRow: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#111111',
    fontSize: 42,
    fontWeight: '600',
    letterSpacing: -1.8,
    lineHeight: 50,
  },
  gridButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectionHeader: {
    minHeight: 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectionCount: {
    color: '#111111',
    fontSize: 16,
    fontWeight: '600',
  },
  deselectButton: {
    minHeight: 48,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: '#111111',
  },
  deselectText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
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
  pressed: {
    opacity: 0.5,
  },
});
