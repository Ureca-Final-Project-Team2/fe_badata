import { markerCaches } from '@/features/rental/map/lib/markerCache';
import { processBatch } from '@/features/rental/map/lib/markerCreator';
import { debounce } from '@/features/rental/map/utils/debounceUtils';

import type { Store, StoreDetail, StoreDevice } from '@/features/rental/map/lib/types';
import type { RentalFilterState } from '@/features/rental/map/model/rentalFilterReducer';

// 디바운싱된 마커 렌더링 함수
const debouncedRenderMarkers = debounce(
  async (
    map: kakao.maps.Map,
    stores: Store[],
    filterParams: RentalFilterState,
    onStoreMarkerClick?: (
      devices: StoreDevice[],
      storeDetail?: StoreDetail,
      storeId?: number,
    ) => void,
  ) => {
    if (!map || !window.kakao) {
      return;
    }

    // 마커 캐시 가져오기
    let cache = markerCaches.get(map);
    if (!cache) {
      cache = new (await import('@/features/rental/map/lib/markerCache')).MarkerCache(map);
      markerCaches.set(map, cache);
    }

    // 기존 마커들 제거
    cache.clearAll();

    // 배치 처리로 마커 생성
    await processBatch(stores, map, filterParams, cache, 5, onStoreMarkerClick);

    // 마커 업데이트 콜백 등록
    const createMarkerUpdateCallback = (storeId: number) => {
      return (isLiked: boolean) => {
        cache?.updateMarker(storeId, 0, isLiked, false);
      };
    };

    // 전역 마커 업데이트 시스템에 등록
    const { registerMarkerUpdateCallback } = await import('@/features/rental/map/lib/markerCache');
    stores.forEach((store) => {
      registerMarkerUpdateCallback(store.id, createMarkerUpdateCallback(store.id));
    });
  },
  300,
);

// 마커 렌더링 함수
export const renderStoreMarkers = async (
  map: kakao.maps.Map,
  stores: Store[],
  filterParams: RentalFilterState,
  onStoreMarkerClick?: (
    devices: StoreDevice[],
    storeDetail?: StoreDetail,
    storeId?: number,
  ) => void,
): Promise<void> => {
  if (!map || !window.kakao) {
    return;
  }

  // 디바운싱된 렌더링 함수 호출
  debouncedRenderMarkers(map, stores, filterParams, onStoreMarkerClick);
};
