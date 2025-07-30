import { markerCaches } from '@/features/rental/map/lib/markerCache';
import { processBatch } from '@/features/rental/map/lib/markerCreator';
import { debounce } from '@/features/rental/map/utils/debounceUtils';

import type { Store, StoreDetail, StoreDevice } from '@/features/rental/map/lib/types';
import type { RentalFilterState } from '@/features/rental/map/model/rentalFilterReducer';

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

    let cache = markerCaches.get(map);
    if (!cache) {
      cache = new (await import('@/features/rental/map/lib/markerCache')).MarkerCache(map);
      markerCaches.set(map, cache);
    }

    // 현재 캐시에 있는 마커들의 storeId 수집
    const existingStoreIds = new Set<number>();
    const currentStoreIds = new Set(stores.map((store) => store.id));

    // 기존 마커들의 storeId 수집
    for (const [, markerData] of cache.markers.entries()) {
      existingStoreIds.add(markerData.storeId);
    }

    // 제거해야 할 마커들 (더 이상 표시되지 않는 스토어들)
    const storesToRemove = Array.from(existingStoreIds).filter(
      (storeId) => !currentStoreIds.has(storeId),
    );

    // 새로 추가해야 할 마커들 (아직 캐시에 없는 스토어들)
    const storesToAdd = stores.filter((store) => !existingStoreIds.has(store.id));

    // 업데이트해야 할 마커들 (이미 존재하지만 속성이 변경된 스토어들)
    const storesToUpdate = stores.filter((store) => existingStoreIds.has(store.id));

    // 1. 제거할 마커들 제거
    storesToRemove.forEach((storeId) => {
      cache.removeMarker(storeId);
    });

    // 2. 새로 추가할 마커들 생성
    if (storesToAdd.length > 0) {
      await processBatch(storesToAdd, map, filterParams, cache, 5, onStoreMarkerClick);
    }

    // 3. 기존 마커들 업데이트 (속성 변경 시)
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

    // 4. 선택된 마커 상태 업데이트
    if (selectedStoreId) {
      cache.updateMarkerSelection(selectedStoreId, true);
    }

    const createMarkerUpdateCallback = (storeId: number) => {
      return (storeId: number, isLiked: boolean) => {
        cache?.updateMarker(storeId, 0, isLiked, false);
      };
    };

    const { registerMarkerUpdateCallback } = await import('@/features/rental/map/lib/markerCache');
    stores.forEach((store) => {
      registerMarkerUpdateCallback(createMarkerUpdateCallback(store.id));
    });
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
