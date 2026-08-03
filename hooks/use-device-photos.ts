import * as MediaLibrary from 'expo-media-library';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, Platform } from 'react-native';

const PAGE_SIZE = 60;
const PHOTO_PERMISSION_OPTIONS = {
  granularPermissions: ['photo'] as MediaLibrary.GranularPermission[],
};

type PageState = Pick<
  MediaLibrary.PagedInfo<MediaLibrary.Asset>,
  'endCursor' | 'hasNextPage' | 'totalCount'
>;

const EMPTY_PAGE: PageState = {
  endCursor: '',
  hasNextPage: false,
  totalCount: 0,
};

type LoadMode = 'initial' | 'refresh';
type GalleryError = {
  message: string;
  retry: 'refresh' | 'next-page';
};

function appendUniqueAssets(
  currentAssets: MediaLibrary.Asset[],
  incomingAssets: MediaLibrary.Asset[]
) {
  const currentIds = new Set(currentAssets.map((asset) => asset.id));
  return [...currentAssets, ...incomingAssets.filter((asset) => !currentIds.has(asset.id))];
}

function getPhotoPage(after?: string) {
  return MediaLibrary.getAssetsAsync({
    first: PAGE_SIZE,
    after,
    mediaType: MediaLibrary.MediaType.photo,
    sortBy: [[MediaLibrary.SortBy.creationTime, false]],
    resolveWithFullInfo: Platform.OS === 'android',
  });
}

export function useDevicePhotos() {
  const [permission, requestPermission, refreshPermission] =
    MediaLibrary.usePermissions(PHOTO_PERMISSION_OPTIONS);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [page, setPage] = useState<PageState>(EMPTY_PAGE);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isActionPending, setIsActionPending] = useState(false);
  const [galleryError, setGalleryError] = useState<GalleryError | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const queryId = useRef(0);

  const loadFirstPage = useCallback(
    async (mode: LoadMode = 'initial') => {
      if (!permission?.granted) return;

      const currentQueryId = ++queryId.current;
      setGalleryError(null);
      if (mode === 'refresh') setIsRefreshing(true);
      else setIsInitialLoading(true);

      try {
        const result = await getPhotoPage();
        if (currentQueryId !== queryId.current) return;

        setAssets(result.assets);
        setPage({
          endCursor: result.endCursor,
          hasNextPage: result.hasNextPage,
          totalCount: result.totalCount,
        });
      } catch {
        if (currentQueryId === queryId.current) {
          setGalleryError({
            message: 'Studio could not read your photo library.',
            retry: 'refresh',
          });
        }
      } finally {
        if (currentQueryId === queryId.current) {
          setIsInitialLoading(false);
          setIsRefreshing(false);
        }
      }
    },
    [permission?.granted]
  );

  const loadNextPage = useCallback(async () => {
    if (
      !permission?.granted ||
      !page.hasNextPage ||
      !page.endCursor ||
      isLoadingMore ||
      isRefreshing
    ) {
      return;
    }

    setIsLoadingMore(true);
    setGalleryError(null);

    try {
      const result = await getPhotoPage(page.endCursor);
      setAssets((currentAssets) => appendUniqueAssets(currentAssets, result.assets));
      setPage({
        endCursor: result.endCursor,
        hasNextPage: result.hasNextPage,
        totalCount: result.totalCount,
      });
    } catch {
      setGalleryError({
        message: 'Studio could not load more photos.',
        retry: 'next-page',
      });
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, isRefreshing, page.endCursor, page.hasNextPage, permission?.granted]);

  const requestAccess = useCallback(async () => {
    setIsActionPending(true);
    setActionError(null);

    try {
      await requestPermission();
    } catch {
      setActionError('Studio could not open the photo permission request.');
    } finally {
      setIsActionPending(false);
    }
  }, [requestPermission]);

  const manageLimitedAccess = useCallback(async () => {
    setIsActionPending(true);
    setActionError(null);

    try {
      await MediaLibrary.presentPermissionsPickerAsync(['photo']);
      await refreshPermission();
      await loadFirstPage('refresh');
    } catch {
      setActionError('Studio could not open the selected-photo manager.');
    } finally {
      setIsActionPending(false);
    }
  }, [loadFirstPage, refreshPermission]);

  useEffect(() => {
    let isMounted = true;

    MediaLibrary.isAvailableAsync()
      .then((available) => {
        if (isMounted) setIsAvailable(available);
      })
      .catch(() => {
        if (isMounted) setIsAvailable(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (permission?.granted) {
      void loadFirstPage();
    } else {
      ++queryId.current;
      setAssets([]);
      setPage(EMPTY_PAGE);
    }
  }, [loadFirstPage, permission?.granted]);

  useEffect(() => {
    const appStateSubscription = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'active') void refreshPermission();
    });

    return () => appStateSubscription.remove();
  }, [refreshPermission]);

  useEffect(() => {
    if (!permission?.granted) return;

    const librarySubscription = MediaLibrary.addListener(() => {
      void refreshPermission();
      void loadFirstPage('refresh');
    });

    return () => librarySubscription.remove();
  }, [loadFirstPage, permission?.granted, refreshPermission]);

  return {
    permission,
    isAvailable,
    assets,
    totalCount: page.totalCount,
    isInitialLoading,
    isRefreshing,
    isLoadingMore,
    isActionPending,
    galleryError,
    actionError,
    requestAccess,
    manageLimitedAccess,
    refresh: () => loadFirstPage('refresh'),
    loadNextPage,
  };
}
