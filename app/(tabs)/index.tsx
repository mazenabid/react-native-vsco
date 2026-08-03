import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProjectTile } from '@/components/studio/project-tile';
import { StudioFilterTabs, type StudioFilter } from '@/components/studio/studio-filter-tabs';
import { STUDIO_PROJECTS } from '@/constants/studio-projects';

const PAGE_PADDING = 20;
const GRID_GAP = 12;

export default function StudioScreen() {
  const { width } = useWindowDimensions();
  const [filter, setFilter] = useState<StudioFilter>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const visibleProjects =
    filter === 'edited' ? STUDIO_PROJECTS.filter((project) => project.isEdited) : STUDIO_PROJECTS;

  const selectedProject = STUDIO_PROJECTS.find((project) => project.id === selectedProjectId);
  const tileSize = Math.min(260, (width - PAGE_PADDING * 2 - GRID_GAP) / 2);
  const editedCount = STUDIO_PROJECTS.filter((project) => project.isEdited).length;

  function selectFilter(nextFilter: StudioFilter) {
    setFilter(nextFilter);
    setSelectedProjectId(null);
  }

  function selectProject(projectId: string) {
    setSelectedProjectId((currentId) => (currentId === projectId ? null : projectId));
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.topLine}>
          <Text style={styles.wordmark}>STUDIO</Text>
          <View style={styles.buildBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.buildBadgeText}>BUILD 002</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>YOUR PRIVATE WORKSPACE</Text>
          <Text style={styles.headline}>Make something worth keeping.</Text>
          <Text style={styles.intro}>
            A quiet home for the photographs, experiments, and edits that are still becoming.
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <View>
            <Text style={styles.summaryValue}>{String(STUDIO_PROJECTS.length).padStart(2, '0')}</Text>
            <Text style={styles.summaryLabel}>STUDIES</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View>
            <Text style={styles.summaryValue}>{String(editedCount).padStart(2, '0')}</Text>
            <Text style={styles.summaryLabel}>EDITED</Text>
          </View>
        </View>

        <StudioFilterTabs value={filter} onChange={selectFilter} />

        <View style={styles.sectionHeading}>
          <View>
            <Text style={styles.sectionTitle}>Visual studies</Text>
            <Text style={styles.sectionCaption}>Demo projects · Device photos arrive in Module 05</Text>
          </View>
          <Text style={styles.resultCount}>{visibleProjects.length}</Text>
        </View>

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

        <View style={styles.selectionPanel}>
          {selectedProject ? (
            <>
              <View style={styles.selectionCopy}>
                <Text style={styles.selectionEyebrow}>SELECTED STUDY</Text>
                <Text style={styles.selectionTitle}>{selectedProject.title}</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Clear selected study"
                onPress={() => setSelectedProjectId(null)}
                style={({ pressed }) => [styles.clearButton, pressed && styles.pressed]}>
                <Text style={styles.clearButtonText}>CLEAR</Text>
              </Pressable>
            </>
          ) : (
            <Text style={styles.selectionHint}>Tap a study to select it. Tap it again to clear.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F1EC',
  },
  content: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    paddingHorizontal: PAGE_PADDING,
    paddingBottom: 48,
  },
  topLine: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#C9C5BC',
  },
  wordmark: {
    color: '#171714',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 3.2,
  },
  buildBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#E6E2D8',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D36B46',
  },
  buildBadgeText: {
    color: '#5F5C54',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  hero: {
    paddingTop: 42,
    paddingBottom: 34,
  },
  eyebrow: {
    marginBottom: 12,
    color: '#7A766D',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.8,
  },
  headline: {
    maxWidth: 340,
    color: '#171714',
    fontSize: 42,
    fontWeight: '500',
    letterSpacing: -1.8,
    lineHeight: 44,
  },
  intro: {
    maxWidth: 355,
    marginTop: 18,
    color: '#68645C',
    fontSize: 15,
    lineHeight: 23,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    paddingVertical: 18,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#C9C5BC',
  },
  summaryValue: {
    color: '#171714',
    fontSize: 18,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  summaryLabel: {
    marginTop: 3,
    color: '#8C887E',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1.4,
  },
  summaryDivider: {
    width: StyleSheet.hairlineWidth,
    height: 34,
    backgroundColor: '#C9C5BC',
  },
  sectionHeading: {
    marginTop: 34,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#171714',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  sectionCaption: {
    marginTop: 5,
    color: '#8C887E',
    fontSize: 10,
  },
  resultCount: {
    color: '#8C887E',
    fontSize: 11,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
  },
  selectionPanel: {
    minHeight: 74,
    marginTop: 28,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#C9C5BC',
    borderRadius: 2,
    backgroundColor: '#ECE9E1',
  },
  selectionCopy: {
    gap: 4,
  },
  selectionEyebrow: {
    color: '#8C887E',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  selectionTitle: {
    color: '#171714',
    fontSize: 14,
    fontWeight: '600',
  },
  selectionHint: {
    color: '#77736A',
    fontSize: 12,
  },
  clearButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 2,
    backgroundColor: '#171714',
  },
  clearButtonText: {
    color: '#F3F1EC',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  pressed: {
    opacity: 0.68,
  },
});
