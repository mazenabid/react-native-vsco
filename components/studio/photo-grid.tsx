import type { Asset } from 'expo-media-library';
import { Image } from 'expo-image';
import { ActivityIndicator, FlatList, Platform, Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { colors, motion, opacity, space } from '@/theme/tokens';

const GRID_GAP = space.xxs;

type PhotoGridProps = {
  assets: Asset[];
  columnCount: 2 | 3;
  tileSize: number;
  isRefreshing: boolean;
  isLoadingMore: boolean;
  error: string | null;
  onRefresh: () => void;
  onEndReached: () => void;
  onRetry: () => void;
};

export function PhotoGrid({
  assets,
  columnCount,
  tileSize,
  isRefreshing,
  isLoadingMore,
  error,
  onRefresh,
  onEndReached,
  onRetry,
}: PhotoGridProps) {
  return (
    <FlatList
      key={`photo-grid-${columnCount}`}
      accessibilityRole="list"
      accessibilityLabel="Device photos"
      data={assets}
      numColumns={columnCount}
      keyExtractor={(asset) => asset.id}
      renderItem={({ item }) => (
        <Image
          accessibilityRole="image"
          accessibilityLabel={item.filename ? `Photo ${item.filename}` : 'Device photo'}
          source={item.uri}
          recyclingKey={item.id}
          cachePolicy="memory-disk"
          contentFit="cover"
          transition={motion.imageReveal}
          style={{ width: tileSize, height: tileSize }}
        />
      )}
      columnWrapperStyle={styles.row}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.7}
      initialNumToRender={18}
      maxToRenderPerBatch={18}
      windowSize={7}
      removeClippedSubviews={Platform.OS === 'android'}
      ListFooterComponent={
        isLoadingMore || error ? (
          <View style={styles.footer}>
            {isLoadingMore ? (
              <ActivityIndicator color={colors.contentPrimary} />
            ) : (
              <>
                <AppText variant="caption" tone="muted">
                  {error}
                </AppText>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Retry loading photos"
                  onPress={onRetry}
                  style={({ pressed }) => [styles.retry, pressed && styles.pressed]}>
                  <AppText variant="buttonLabel">RETRY</AppText>
                </Pressable>
              </>
            )}
          </View>
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  row: {
    gap: GRID_GAP,
  },
  separator: {
    height: GRID_GAP,
  },
  content: {
    paddingBottom: GRID_GAP,
  },
  footer: {
    minHeight: 72,
    paddingHorizontal: space.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.md,
  },
  retry: {
    minHeight: 44,
    paddingHorizontal: space.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: opacity.pressed,
  },
});
