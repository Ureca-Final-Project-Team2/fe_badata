import { MarkerCache, markerCaches } from '@/features/rental/map/lib/markerCache';
import { processBatch } from '@/features/rental/map/lib/markerCreator';
import { debounce } from '@/features/rental/map/utils/debounceUtils';

import type { Store, StoreDetail, StoreDevice } from '@/features/rental/map/lib/types';
import type { RentalFilterState } from '@/features/rental/map/model/rentalFilterReducer';

// 마커 렌더링 함수 (디바운싱 적용)
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
    try {
      // 마커 캐시 가져오기 또는 생성
      let cache = markerCaches.get(map);
      if (!cache) {
        cache = new MarkerCache(map);
        markerCaches.set(map, cache);
      }

      // 현재 스토어 ID들
      const currentStoreIds = new Set(stores.map((store) => store.id));

      // 기존 마커 중에서 현재 스토어에 없는 것들 제거
      cache.removeMarkersExcept(currentStoreIds);

      // 새 마커들 생성
      const createdStoreIds = await processBatch(
        stores,
        map,
        filterParams,
        cache,
        5,
        onStoreMarkerClick,
      );

      // 성공적으로 생성된 마커들만 유지
      cache.removeMarkersExcept(createdStoreIds);
    } catch (error) {
      console.error('마커 렌더링 중 오류 발생:', error);
    }
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
): Promise<void> => {
  if (!map || !window.kakao) {
    return;
  }

  // 디바운싱된 렌더링 함수 호출
  debouncedRenderMarkers(map, stores, filterParams, onStoreMarkerClick);
};
