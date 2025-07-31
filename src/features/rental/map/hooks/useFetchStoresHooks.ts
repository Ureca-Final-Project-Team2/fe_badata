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
  const lastZoomLevelRef = useRef<number | null>(null);
  const isInitializedRef = useRef(false);

  // 지도 bounds 업데이트 함수
  const updateStoresByBounds = useCallback(async () => {
    if (!map) {
      console.log('⚠️ map이 null입니다');
      return;
    }

    try {
      const bounds = map.getBounds();
      const swLatLng = bounds.getSouthWest();
      const neLatLng = bounds.getNorthEast();
      const zoomLevel = map.getLevel();
      const center = map.getCenter();

      // 지도가 유효한 데이터를 가지고 있는지 확인
      if (!bounds || !swLatLng || !neLatLng || zoomLevel === undefined) {
        console.log('⚠️ 지도 데이터가 유효하지 않습니다:', {
          bounds,
          swLatLng,
          neLatLng,
          zoomLevel,
        });
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
        console.log('⚠️ bounds가 모두 0입니다, API 호출 건너뜀');
        return;
      }

      // 콘솔에 zoom level과 위치 정보 출력
      console.log('🔍 지도 변경 감지:', {
        zoomLevel,
        center: {
          lat: center.getLat(),
          lng: center.getLng(),
        },
        bounds: newBounds,
        mapInfo: {
          centerLat: center.getLat(),
          centerLng: center.getLng(),
          zoomLevel: zoomLevel,
        },
      });

      // bounds나 filterState가 실제로 변경되었는지 확인
      const boundsChanged = JSON.stringify(newBounds) !== JSON.stringify(lastBoundsRef.current);
      const filterChanged =
        JSON.stringify(filterState) !== JSON.stringify(lastFilterStateRef.current);
      const zoomLevelChanged = zoomLevel !== lastZoomLevelRef.current;

      console.log('🔍 변경사항 확인:', {
        boundsChanged,
        filterChanged,
        zoomLevelChanged,
        currentZoomLevel: zoomLevel,
        lastZoomLevel: lastZoomLevelRef.current,
      });

      // 줌 레벨이 변경되었거나 초기 로드인 경우 강제로 API 호출
      if (zoomLevelChanged || lastZoomLevelRef.current === null) {
        console.log('✅ 줌 레벨 변경 감지됨, API 호출 시작');
      } else if (!boundsChanged && !filterChanged && !zoomLevelChanged) {
        console.log('ℹ️ 변경사항 없음, API 호출 건너뜀');
        return; // 변경사항이 없으면 API 호출하지 않음
      } else {
        console.log('✅ 다른 변경사항 감지됨, API 호출 시작');
      }

      // 이전 타이머가 있다면 취소
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      // 줌 레벨 변경 시에는 더 빠르게 응답
      const debounceTime = zoomLevelChanged ? 100 : 500;
      console.log(`⏱️ 디바운싱 시간: ${debounceTime}ms`);

      // 디바운싱
      debounceRef.current = setTimeout(async () => {
        try {
          if (!map) return;
          setIsLoading(true);

          setCurrentBounds(newBounds);
          lastBoundsRef.current = newBounds;
          lastFilterStateRef.current = filterState;
          lastZoomLevelRef.current = zoomLevel;

          const mergedParams = mapFilterStateToApiParams(newBounds, filterState, zoomLevel);

          // zoomLevel이 제대로 포함되었는지 확인
          console.log('🔍 mergedParams 확인:', mergedParams);
          console.log('🔍 zoomLevel 값:', zoomLevel);
          console.log('🔍 mergedParams.zoomLevel:', mergedParams.zoomLevel);

          // URL 파라미터 스트링 생성 및 출력
          const urlParams = new URLSearchParams();
          Object.entries(mergedParams).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              // 배열인 경우 각 요소를 개별 파라미터로 추가
              value.forEach((item) => urlParams.append(key, item.toString()));
            } else if (value !== undefined && value !== null) {
              urlParams.append(key, value.toString());
            }
          });

          const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'https://api.badata.store'}/api/v1/stores/map?${urlParams.toString()}`;
          console.log('🌐 API URL:', apiUrl);

          const stores = await fetchStores(mergedParams);

          console.log('🔍 API 호출 결과 stores:', stores);
          console.log('🔍 stores 배열 길이:', stores.length);
          console.log('🔍 첫 번째 store:', stores[0]);

          // stores가 실제로 변경되었는지 확인
          const storesChanged = JSON.stringify(stores) !== JSON.stringify(lastStoresRef.current);
          if (storesChanged) {
            setStores(stores);
            lastStoresRef.current = stores;
            console.log('✅ stores 상태 업데이트 완료');
          } else {
            console.log('ℹ️ stores 변경사항 없음');
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
      console.log('🗺️ 지도 초기화 시작');

      // 지도가 완전히 로드될 때까지 기다린 후 초기 로드
      const initializeAfterMapReady = () => {
        try {
          const bounds = map.getBounds();
          const zoomLevel = map.getLevel();

          // 지도가 유효한 bounds를 가지고 있는지 확인
          if (bounds && zoomLevel !== undefined) {
            console.log('🗺️ 지도 준비 완료, 초기 로드 시작');
            updateStoresByBounds();
          } else {
            console.log('🗺️ 지도 아직 준비되지 않음, 100ms 후 재시도');
            setTimeout(initializeAfterMapReady, 100);
          }
        } catch (error) {
          console.log('🗺️ 지도 초기화 중 오류, 100ms 후 재시도:', error);
          setTimeout(initializeAfterMapReady, 100);
        }
      };

      // 지도 이동/줌 이벤트 리스너 등록
      const boundsChangedListener = () => {
        console.log('🎯 지도 이벤트 발생: bounds_changed 또는 zoom_changed');
        updateStoresByBounds();
      };

      console.log('🎯 지도 이벤트 리스너 등록 시작');
      window.kakao.maps.event.addListener(map, 'bounds_changed', boundsChangedListener);
      window.kakao.maps.event.addListener(map, 'zoom_changed', boundsChangedListener);
      console.log('✅ 지도 이벤트 리스너 등록 완료');

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
