import { useCallback, useEffect, useRef, useState } from 'react';

import { fetchStores } from '@/features/rental/map/api/apis';
import { mapFilterStateToApiParams } from '@/features/rental/map/utils/filterParamsMapper';

import type { Store } from '@/features/rental/map/lib/types';
import type { RentalFilterState } from '@/features/rental/map/model/rentalFilterReducer';

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
  const lastBoundsRef = useRef(currentBounds);
  const lastFilterStateRef = useRef(filterState);
  const lastStoresRef = useRef<Store[]>([]);
  const isInitializedRef = useRef(false);

  // 지도 bounds 업데이트 함수
  const updateStoresByBounds = useCallback(async () => {
    if (!map) {
      return;
    }

    try {
      const bounds = map.getBounds();
      const swLatLng = bounds.getSouthWest();
      const neLatLng = bounds.getNorthEast();
      const zoomLevel = map.getLevel();

      const newBounds = {
        swLat: swLatLng.getLat(),
        swLng: swLatLng.getLng(),
        neLat: neLatLng.getLat(),
        neLng: neLatLng.getLng(),
      };

      // bounds나 filterState가 실제로 변경되었는지 확인
      const boundsChanged = JSON.stringify(newBounds) !== JSON.stringify(lastBoundsRef.current);
      const filterChanged =
        JSON.stringify(filterState) !== JSON.stringify(lastFilterStateRef.current);

      if (!boundsChanged && !filterChanged) {
        return; // 변경사항이 없으면 API 호출하지 않음
      }

      // 이전 타이머가 있다면 취소
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      // 500ms 디바운싱
      debounceRef.current = setTimeout(async () => {
        try {
          if (!map) return;
          setIsLoading(true);

          setCurrentBounds(newBounds);
          lastBoundsRef.current = newBounds;
          lastFilterStateRef.current = filterState;

          const mergedParams = mapFilterStateToApiParams(newBounds, filterState, zoomLevel);
          const stores = await fetchStores(mergedParams);

          // stores가 실제로 변경되었는지 확인
          const storesChanged = JSON.stringify(stores) !== JSON.stringify(lastStoresRef.current);
          if (storesChanged) {
            setStores(stores);
            lastStoresRef.current = stores;
          }
        } catch (e) {
          console.error('가맹점 불러오기 실패:', e);
        } finally {
          if (map) {
            setIsLoading(false);
          }
        }
      }, 500);
    } catch (error) {
      console.error('맵 bounds 가져오기 실패:', error);
    }
  }, [map, filterState]);

  // 초기 로드 및 지도 bounds 변경 감지
  useEffect(() => {
    if (!map) {
      return;
    }

    // 초기화 플래그 확인
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;

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
    }
  }, [map, updateStoresByBounds]);

  // filterState 변경 시 즉시 업데이트 (초기화 후에만)
  useEffect(() => {
    if (map && filterState && isInitializedRef.current) {
      updateStoresByBounds();
    }
  }, [filterState, map, updateStoresByBounds]);

  return {
    stores,
    isLoading,
    currentBounds,
    refreshStores: updateStoresByBounds,
  };
};
