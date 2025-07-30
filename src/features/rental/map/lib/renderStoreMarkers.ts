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
      console.log('🗺️ 마커 렌더링 시작:', stores.length, '개 스토어');

      // 마커 캐시 가져오기 또는 생성
      let cache = markerCaches.get(map);
      if (!cache) {
        cache = new MarkerCache(map);
        markerCaches.set(map, cache);
        console.log('🗺️ 새 마커 캐시 생성');
      } else {
        console.log('🗺️ 기존 마커 캐시 사용, 현재 마커 수:', cache.getMarkerCount());
      }

      // 현재 스토어 ID들
      const currentStoreIds = new Set(stores.map((store) => store.id));
      console.log('🗺️ 현재 스토어 ID들:', Array.from(currentStoreIds));

      // 기존 마커 중에서 현재 스토어에 없는 것들 제거
      cache.removeMarkersExcept(currentStoreIds);
      console.log('🗺️ 불필요한 마커 제거 완료');

      // 새 마커들 생성
      const createdStoreIds = await processBatch(
        stores,
        map,
        filterParams,
        cache,
        5,
        onStoreMarkerClick,
      );

      console.log('🗺️ 생성된 마커 수:', createdStoreIds.size);

      // 성공적으로 생성된 마커들만 유지
      cache.removeMarkersExcept(createdStoreIds);
      console.log('🗺️ 마커 렌더링 완료, 최종 마커 수:', cache.getMarkerCount());
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
