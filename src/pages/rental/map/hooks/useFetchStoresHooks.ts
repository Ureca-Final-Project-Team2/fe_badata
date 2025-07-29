import { useCallback, useEffect, useRef, useState } from 'react';

import { fetchStores } from '@/pages/rental/map/api/apis';
import { mapFilterStateToApiParams } from '@/pages/rental/map/utils/filterParamsMapper';

import type { Store } from '@/pages/rental/map/lib/types';
import type { RentalFilterState } from '@/pages/rental/map/model/rentalFilterReducer';

export const useFetchStoresHooks = (
  map: kakao.maps.Map | null,
  filterState?: RentalFilterState,
) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentBounds, setCurrentBounds] = useState({
    swLat: 33.0,
    swLng: 124.0,
    neLat: 39.0,
    neLng: 132.0,
  });

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // 지도 bounds 업데이트 함수 (디바운싱 적용)
  const updateStoresByBounds = useCallback(async () => {
    if (!map) return;

    // 이전 타이머가 있다면 취소
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // 300ms 디바운싱
    debounceRef.current = setTimeout(async () => {
      try {
        setIsLoading(true);

        const bounds = map.getBounds();
        const swLatLng = bounds.getSouthWest();
        const neLatLng = bounds.getNorthEast();

        const newBounds = {
          swLat: swLatLng.getLat(),
          swLng: swLatLng.getLng(),
          neLat: neLatLng.getLat(),
          neLng: neLatLng.getLng(),
        };

        setCurrentBounds(newBounds);

        const mergedParams = mapFilterStateToApiParams(newBounds, filterState);

        const stores = await fetchStores(mergedParams);
        setStores(stores);
      } catch (e) {
        console.error('가맹점 불러오기 실패:', e);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  }, [map, filterState]);

  // 초기 로드 및 지도 bounds 변경 감지
  useEffect(() => {
    if (!map) return;

    // 초기 로드
    updateStoresByBounds();

    // 지도 이동/줌 이벤트 리스너 등록
    const boundsChangedListener = () => {
      updateStoresByBounds();
    };

    window.kakao.maps.event.addListener(map, 'bounds_changed', boundsChangedListener);
    window.kakao.maps.event.addListener(map, 'zoom_changed', boundsChangedListener);

    // 클린업
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      window.kakao.maps.event.removeListener(map, 'bounds_changed', boundsChangedListener);
      window.kakao.maps.event.removeListener(map, 'zoom_changed', boundsChangedListener);
    };
  }, [map, updateStoresByBounds]);

  return {
    stores,
    isLoading,
    currentBounds,
    refreshStores: updateStoresByBounds,
  };
};
