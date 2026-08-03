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
    <SafeAreaView style={styles.safeArea} edges={['top']}>
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
            <View style={styles.utilityRow}>
              <View style={styles.utilityButton} accessibilityElementsHidden>
                <Feather name="menu" size={36} color="#FFFFFF" />
              </View>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Show ${columnCount === 3 ? 'large' : 'small'} grid`}
                onPress={toggleGridSize}
                hitSlop={10}
                style={({ pressed }) => [styles.utilityButton, pressed && styles.pressed]}>
                <View style={styles.viewControlIcon}>
                  <View style={styles.viewControlDot} />
                </View>
              </Pressable>
            </View>

            <View style={styles.titleRow}>
              <Text style={styles.title}>Studio</Text>
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
    backgroundColor: '#000000',
  },
  appFrame: {
    width: '100%',
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingTop: 12,
    paddingBottom: 16,
  },
  utilityRow: {
    height: 48,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  utilityButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewControlIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 2,
  },
  viewControlDot: {
    width: 6,
    height: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 3,
  },
  titleRow: {
    marginTop: 34,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '500',
    letterSpacing: -0.9,
    lineHeight: 40,
  },
  selectionHeader: {
    minHeight: 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectionCount: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  deselectButton: {
    minHeight: 48,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
  },
  deselectText: {
    color: '#000000',
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
