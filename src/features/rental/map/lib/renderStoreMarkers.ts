import {
  createMarkerImage,
  MarkerCache,
  markerCaches,
  registerMarkerUpdateCallback,
} from '@/features/rental/map/lib/markerCache';
import { processBatch } from '@/features/rental/map/lib/markerCreator';
import { debounce } from '@/features/rental/map/utils/debounceUtils';

import type { Store, StoreDetail, StoreDevice } from '@/features/rental/map/lib/types';
import type { RentalFilterState } from '@/features/rental/map/model/rentalFilterReducer';

// 마커 업데이트 콜백 함수
const createMarkerUpdateCallback = (map: kakao.maps.Map) => {
  return (storeId: number, isLiked: boolean) => {
    const cache = markerCaches.get(map);
    if (cache && cache.hasMarker(storeId)) {
      // 로그인 상태 확인
      const isLoggedIn =
        typeof window !== 'undefined' && localStorage.getItem('auth-storage')
          ? JSON.parse(localStorage.getItem('auth-storage') || '{}').state?.isLoggedIn || false
          : false;

      // 좋아요 상태 결정: 로그인한 사용자이고 liked가 true인 경우에만 like_active 표시
      const shouldShowLikeActive = isLoggedIn && isLiked;

      // 마커 데이터 가져오기
      const markerData = cache.getMarkerData(storeId);
      if (markerData) {
        // 마커 이미지 업데이트
        markerData.marker.setImage(createMarkerImage(shouldShowLikeActive, markerData.isCluster));
        markerData.isLiked = shouldShowLikeActive;
      }
    }
  };
};

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

      // 마커 업데이트 콜백 등록 (한 번만 등록)
      const markerUpdateCallback = createMarkerUpdateCallback(map);
      registerMarkerUpdateCallback(markerUpdateCallback);

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
