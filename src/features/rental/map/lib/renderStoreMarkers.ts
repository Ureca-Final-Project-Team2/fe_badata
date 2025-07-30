import { markerCaches } from '@/features/rental/map/lib/markerCache';
import { processBatch } from '@/features/rental/map/lib/markerCreator';
import { debounce } from '@/features/rental/map/utils/debounceUtils';

import type { MarkerCache } from '@/features/rental/map/lib/markerCache';
import type { Store, StoreDetail, StoreDevice } from '@/features/rental/map/lib/types';
import type { RentalFilterState } from '@/features/rental/map/model/rentalFilterReducer';

// 마커 캐시 관리를 위한 헬퍼 함수들
const getMarkerCache = async (map: kakao.maps.Map) => {
  let cache = markerCaches.get(map);
  if (!cache) {
    cache = new (await import('@/features/rental/map/lib/markerCache')).MarkerCache(map);
    markerCaches.set(map, cache);
  }
  return cache;
};

const getStoreIdSets = (cache: MarkerCache, stores: Store[]) => {
  const existingStoreIds = new Set<number>();
  const currentStoreIds = new Set(stores.map((store) => store.id));

  // 기존 마커들의 storeId 수집
  for (const [, markerData] of cache.markers.entries()) {
    existingStoreIds.add(markerData.storeId);
  }

  return { existingStoreIds, currentStoreIds };
};

const categorizeStores = (
  stores: Store[],
  existingStoreIds: Set<number>,
  currentStoreIds: Set<number>,
) => {
  // 제거해야 할 마커들 (더 이상 표시되지 않는 스토어들)
  const storesToRemove = Array.from(existingStoreIds).filter(
    (storeId) => !currentStoreIds.has(storeId),
  );

  // 새로 추가해야 할 마커들 (아직 캐시에 없는 스토어들)
  const storesToAdd = stores.filter((store) => !existingStoreIds.has(store.id));

  // 업데이트해야 할 마커들 (이미 존재하지만 속성이 변경된 스토어들)
  const storesToUpdate = stores.filter((store) => existingStoreIds.has(store.id));

  return { storesToRemove, storesToAdd, storesToUpdate };
};

const updateExistingMarkers = (cache: MarkerCache, storesToUpdate: Store[]) => {
  for (const store of storesToUpdate) {
    const markerData = cache.getMarkerData(store.id);
    if (markerData) {
      // 디바이스 개수나 좋아요 상태가 변경된 경우에만 업데이트
      const needsUpdate =
        markerData.deviceCount !== store.leftDeviceCount || markerData.isLiked !== store.liked;

      if (needsUpdate) {
        cache.updateMarker(store.id, store.leftDeviceCount, store.liked, store.isCluster);
      }
    }
  }
};

const registerMarkerCallbacks = async (stores: Store[], cache: MarkerCache) => {
  const createMarkerUpdateCallback = () => {
    return (storeId: number, isLiked: boolean) => {
      cache?.updateMarker(storeId, 0, isLiked, false);
    };
  };

  const { registerMarkerUpdateCallback } = await import('@/features/rental/map/lib/markerCache');
  stores.forEach(() => {
    registerMarkerUpdateCallback(createMarkerUpdateCallback());
  });
};

export const debouncedRenderMarkers = debounce(
  async (
    map: kakao.maps.Map,
    stores: Store[],
    filterParams: RentalFilterState,
    onStoreMarkerClick?: (
      devices: StoreDevice[],
      storeDetail?: StoreDetail,
      storeId?: number,
    ) => void,
    selectedStoreId?: number | null,
  ) => {
    if (!map || !window.kakao) {
      return;
    }

    const cache = await getMarkerCache(map);
    const { existingStoreIds, currentStoreIds } = getStoreIdSets(cache, stores);
    const { storesToRemove, storesToAdd, storesToUpdate } = categorizeStores(
      stores,
      existingStoreIds,
      currentStoreIds,
    );

    // 1. 제거할 마커들 제거
    storesToRemove.forEach((storeId) => {
      cache.removeMarker(storeId);
    });

    // 2. 새로 추가할 마커들 생성
    if (storesToAdd.length > 0) {
      await processBatch(storesToAdd, map, filterParams, cache, 5, onStoreMarkerClick);
    }

    // 3. 기존 마커들 업데이트 (속성 변경 시)
    updateExistingMarkers(cache, storesToUpdate);

    // 4. 선택된 마커 상태 업데이트
    if (selectedStoreId) {
      cache.updateMarkerSelection(selectedStoreId, true);
    }

    // 5. 마커 업데이트 콜백 등록
    await registerMarkerCallbacks(stores, cache);
  },
  300,
);

export const renderStoreMarkers = async (
  map: kakao.maps.Map,
  stores: Store[],
  filterParams: RentalFilterState,
  onStoreMarkerClick?: (
    devices: StoreDevice[],
    storeDetail?: StoreDetail,
    storeId?: number,
  ) => void,
  selectedStoreId?: number | null,
): Promise<void> => {
  if (!map || !window.kakao) {
    return;
  }
  debouncedRenderMarkers(map, stores, filterParams, onStoreMarkerClick, selectedStoreId);
};
