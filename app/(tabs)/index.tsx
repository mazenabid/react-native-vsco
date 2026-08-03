import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { Linking, Platform, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/navigation/screen-header';
import { PhotoGrid } from '@/components/studio/photo-grid';
import { StudioState } from '@/components/studio/studio-state';
import { AppText } from '@/components/ui/app-text';
import { IconButton } from '@/components/ui/icon-button';
import { useDevicePhotos } from '@/hooks/use-device-photos';
import { borders, colors, opacity, sizes, space } from '@/theme/tokens';

const GRID_GAP = space.xxs;

export default function StudioScreen() {
  if (Platform.OS === 'web') return <WebStudioScreen />;
  return <NativeStudioScreen />;
}

function WebStudioScreen() {
  return (
    <StudioFrame>
      <StudioState
        icon="smartphone"
        title="Device photos live on your phone."
        body="Open this project in Expo Go on iOS or Android to request photo access and render your camera roll."
      />
    </StudioFrame>
  );
}

function NativeStudioScreen() {
  const { width } = useWindowDimensions();
  const [columnCount, setColumnCount] = useState<2 | 3>(3);
  const {
    permission,
    isAvailable,
    assets,
    isInitialLoading,
    isRefreshing,
    isLoadingMore,
    isActionPending,
    galleryError,
    actionError,
    requestAccess,
    manageLimitedAccess,
    refresh,
    loadNextPage,
  } = useDevicePhotos();

  const contentWidth = Math.min(width, sizes.maxContentWidth);
  const tileSize = (contentWidth - GRID_GAP * (columnCount - 1)) / columnCount;
  const hasLimitedAccess = permission?.accessPrivileges === 'limited';
  const hasPhotos = assets.length > 0;

  function toggleGridSize() {
    setColumnCount((currentCount) => (currentCount === 3 ? 2 : 3));
  }

  async function openSettings() {
    await Linking.openSettings();
  }

  const gridControl = hasPhotos ? (
    <IconButton
      label={`Show ${columnCount === 3 ? 'large' : 'small'} grid`}
      onPress={toggleGridSize}>
      <View style={styles.viewControlIcon}>
        <View style={styles.viewControlDot} />
      </View>
    </IconButton>
  ) : undefined;

  return (
    <StudioFrame headerRight={gridControl}>
      {hasLimitedAccess ? (
        <View style={styles.limitedNotice}>
          <View style={styles.limitedCopy}>
            <Feather name="lock" size={16} color={colors.contentPrimary} />
            <AppText variant="caption">Selected photos only</AppText>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Manage selected photos"
            disabled={isActionPending}
            onPress={manageLimitedAccess}
            style={({ pressed }) => [
              styles.manageButton,
              pressed && styles.pressed,
              isActionPending && styles.disabled,
            ]}>
            <AppText variant="buttonLabel">MANAGE</AppText>
          </Pressable>
        </View>
      ) : null}
      {hasLimitedAccess && actionError ? (
        <View style={styles.actionError} accessibilityLiveRegion="polite">
          <AppText variant="caption" tone="muted">
            {actionError}
          </AppText>
        </View>
      ) : null}

      {renderNativeContent({
        permission,
        isAvailable,
        assets,
        columnCount,
        tileSize,
        isInitialLoading,
        isRefreshing,
        isLoadingMore,
        isActionPending,
        galleryError,
        actionError,
        requestAccess,
        openSettings,
        refresh,
        loadNextPage,
      })}
    </StudioFrame>
  );
}

type NativeContentProps = Pick<
  ReturnType<typeof useDevicePhotos>,
  | 'permission'
  | 'isAvailable'
  | 'assets'
  | 'isInitialLoading'
  | 'isRefreshing'
  | 'isLoadingMore'
  | 'isActionPending'
  | 'galleryError'
  | 'actionError'
  | 'requestAccess'
  | 'refresh'
  | 'loadNextPage'
> & {
  columnCount: 2 | 3;
  tileSize: number;
  openSettings: () => Promise<void>;
};

function renderNativeContent({
  permission,
  isAvailable,
  assets,
  columnCount,
  tileSize,
  isInitialLoading,
  isRefreshing,
  isLoadingMore,
  isActionPending,
  galleryError,
  actionError,
  requestAccess,
  openSettings,
  refresh,
  loadNextPage,
}: NativeContentProps) {
  if (isAvailable === null || permission === null) {
    return (
      <StudioState
        icon="image"
        title="Checking your photo library."
        body="Studio is confirming what photo access is available on this device."
        isBusy
      />
    );
  }

  if (!isAvailable) {
    return (
      <StudioState
        icon="slash"
        title="Photo access is unavailable."
        body="This device does not provide a media library that Studio can read."
      />
    );
  }

  if (!permission.granted) {
    if (permission.status === 'denied' && !permission.canAskAgain) {
      return (
        <StudioState
          icon="lock"
          title="Photo access is off."
          body="Open Settings and allow photo access to bring your camera roll into Studio."
          actionLabel="OPEN SETTINGS"
          onAction={() => void openSettings()}
        />
      );
    }

    return (
      <StudioState
        icon={permission.status === 'denied' ? 'lock' : 'image'}
        title={
          permission.status === 'denied'
            ? "Photo access wasn't granted."
            : 'Add a photo from your camera roll to start editing.'
        }
        body={
          actionError ??
          'Your library stays on your device. Studio asks for photo access only when you choose to continue.'
        }
        actionLabel={permission.status === 'denied' ? 'TRY AGAIN' : 'ALLOW PHOTO ACCESS'}
        onAction={() => void requestAccess()}
        isBusy={isActionPending}
      />
    );
  }

  if (isInitialLoading && assets.length === 0) {
    return (
      <StudioState
        icon="image"
        title="Loading your photos."
        body="Studio is preparing the newest images from your camera roll."
        isBusy
      />
    );
  }

  if (galleryError && assets.length === 0) {
    return (
      <StudioState
        icon="alert-circle"
        title="Your photos couldn't load."
        body={galleryError.message}
        actionLabel="TRY AGAIN"
        onAction={refresh}
      />
    );
  }

  if (assets.length === 0) {
    return (
      <StudioState
        icon="image"
        title="No photos found."
        body="Studio can only show photos currently available to this app. Add photos to the device or expand selected access, then refresh."
        actionLabel="REFRESH"
        onAction={refresh}
      />
    );
  }

  return (
    <PhotoGrid
      assets={assets}
      columnCount={columnCount}
      tileSize={tileSize}
      isRefreshing={isRefreshing}
      isLoadingMore={isLoadingMore}
      error={galleryError?.message ?? null}
      onRefresh={refresh}
      onEndReached={loadNextPage}
      onRetry={galleryError?.retry === 'next-page' ? loadNextPage : refresh}
    />
  );
}

type StudioFrameProps = {
  children: React.ReactNode;
  headerRight?: React.ReactNode;
};

function StudioFrame({ children, headerRight }: StudioFrameProps) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.appFrame}>
        <ScreenHeader title="Studio" right={headerRight} />
        {children}
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
    maxWidth: sizes.maxContentWidth,
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
  limitedNotice: {
    minHeight: 48,
    paddingLeft: space.lg,
    paddingRight: space.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderSubtle,
  },
  limitedCopy: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
  },
  actionError: {
    paddingHorizontal: space.lg,
    paddingVertical: space.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderSubtle,
  },
  manageButton: {
    minWidth: 88,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: opacity.pressed,
  },
  disabled: {
    opacity: 0.5,
  },
});
