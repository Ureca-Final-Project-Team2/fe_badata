import { useCallback, useEffect, useRef, useState } from 'react';

import { fetchStores } from '@/features/rental/map/api/apis';
import { getClusterClickActive } from '@/features/rental/map/lib/clusterMarker';
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
  const lastZoomLevelRef = useRef<number | null>(null);
  const isInitializedRef = useRef(false);

  // 지도 bounds 업데이트 함수
  const updateStoresByBounds = useCallback(async () => {
    if (!map) {
      return;
    }

    // 클러스터 클릭이 활성화되어 있으면 API 호출 건너뛰기
    const isClusterClick = getClusterClickActive();
    if (isClusterClick) {
      console.log('🔍 클러스터 클릭 활성화 - API 호출 건너뜀');

      // 클러스터 클릭 시에는 짧은 지연 후 API 호출 허용
      setTimeout(() => {
        console.log('🔍 클러스터 클릭 후 API 호출 허용');
      }, 200); // 200ms 후 API 호출 허용

      return;
    }

    try {
      const bounds = map.getBounds();
      const swLatLng = bounds.getSouthWest();
      const neLatLng = bounds.getNorthEast();
      const zoomLevel = map.getLevel();

      // 지도가 유효한 데이터를 가지고 있는지 확인
      if (!bounds || !swLatLng || !neLatLng || zoomLevel === undefined) {
        return;
      }

      const newBounds = {
        swLat: swLatLng.getLat(),
        swLng: swLatLng.getLng(),
        neLat: neLatLng.getLat(),
        neLng: neLatLng.getLng(),
      };

      // bounds가 유효한지 확인
      if (
        newBounds.swLat === 0 &&
        newBounds.swLng === 0 &&
        newBounds.neLat === 0 &&
        newBounds.neLng === 0
      ) {
        return;
      }

      const zoomLevelChanged = zoomLevel !== lastZoomLevelRef.current;

      // 이전 타이머가 있다면 취소
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      // 줌 레벨 변경 시에는 더 빠르게 응답
      const debounceTime = zoomLevelChanged ? 100 : 500;
      // 디바운싱
      debounceRef.current = setTimeout(async () => {
        try {
          if (!map) return;

          // 클러스터 클릭 상태 재확인
          const isClusterClick = getClusterClickActive();
          if (isClusterClick) {
            console.log('🔍 디바운스 중 클러스터 클릭 활성화 - API 호출 건너뜀');
            return;
          }

          setIsLoading(true);

          setCurrentBounds(newBounds);
          lastBoundsRef.current = newBounds;
          lastFilterStateRef.current = filterState;
          lastZoomLevelRef.current = zoomLevel;

          const mergedParams = mapFilterStateToApiParams(newBounds, filterState, zoomLevel);

          // 디버그: mergedParams 내용 확인
          console.log('🔍 mergedParams 내용:', mergedParams);
          console.log(
            '🔍 dataCapacity 타입:',
            typeof mergedParams.dataCapacity,
            mergedParams.dataCapacity,
          );
          console.log(
            '🔍 maxSupportConnection 타입:',
            typeof mergedParams.maxSupportConnection,
            mergedParams.maxSupportConnection,
          );

          // URL 파라미터 스트링 생성 및 출력
          const urlParams = new URLSearchParams();
          Object.entries(mergedParams).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              // dataCapacity와 maxSupportConnection은 단일 값으로 처리
              if (key === 'dataCapacity' || key === 'maxSupportConnection') {
                urlParams.append(key, value.toString());
              } else if (Array.isArray(value)) {
                // 배열인 경우 각 요소를 개별 파라미터로 추가
                value.forEach((item) => urlParams.append(key, item.toString()));
              } else {
                urlParams.append(key, value.toString());
              }
            }
          });

          const stores = await fetchStores(mergedParams);

          // 디버그: 실제 API 호출 직전 파라미터 확인
          console.log('🔍 fetchStores 호출 직전 mergedParams:', mergedParams);

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
      }, debounceTime);
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
      // 지도가 완전히 로드될 때까지 기다린 후 초기 로드
      const initializeAfterMapReady = () => {
        try {
          const bounds = map.getBounds();
          const zoomLevel = map.getLevel();

          // 지도가 유효한 bounds를 가지고 있는지 확인
          if (bounds && zoomLevel !== undefined) {
            updateStoresByBounds();
          } else {
            setTimeout(initializeAfterMapReady, 100);
          }
        } catch (error) {
          console.log('🗺️ 지도 초기화 중 오류, 100ms 후 재시도:', error);
          setTimeout(initializeAfterMapReady, 100);
        }
      };

      // 지도 이동/줌 이벤트 리스너 등록
      const boundsChangedListener = () => {
        updateStoresByBounds();
      };

      window.kakao.maps.event.addListener(map, 'bounds_changed', boundsChangedListener);
      window.kakao.maps.event.addListener(map, 'zoom_changed', boundsChangedListener);

      // 지도 준비 완료 후 초기 로드
      initializeAfterMapReady();

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
