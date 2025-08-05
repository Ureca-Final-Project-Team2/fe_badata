import { useEffect, useState } from 'react';

import { fetchStores } from '@/features/rental/map/api/apis';
import { getClusterClickActive } from '@/features/rental/map/lib/clusterMarker';
import { markerCaches } from '@/features/rental/map/lib/markerCache';
import { debouncedRenderMarkers } from '@/features/rental/map/lib/renderStoreMarkers';

import type { FetchStoresParams, StoreDetail, StoreDevice } from '@/features/rental/map/lib/types';
import type { RentalFilterState } from '@/features/rental/map/model/rentalFilterReducer';

export const useMapZoomLevel = (
  map: kakao.maps.Map | null,
  filterState: RentalFilterState,
  onStoreMarkerClick?: (
    devices: StoreDevice[],
    storeDetail?: StoreDetail,
    storeId?: number,
  ) => void,
  onZoomLevelChange?: (newZoomLevel: number, center: { lat: number; lng: number }) => void,
) => {
  const [zoomLevel, setZoomLevel] = useState<number>(3);
  const [zoomChanged, setZoomChanged] = useState(false);

  useEffect(() => {
    if (!map) return;

    const listener = async () => {
      const newZoom = map.getLevel();
      const currentCenter = map.getCenter();
      const isClusterClick = getClusterClickActive();

      console.log('🔍 줌 레벨 변경 감지 및 통합 처리 시작:', {
        newZoom,
        currentCenter: {
          lat: currentCenter.getLat(),
          lng: currentCenter.getLng(),
        },
        isClusterClick,
      });

      setZoomLevel(newZoom);
      setZoomChanged(true);

      // 클러스터 클릭으로 인한 줌 변경이면 짧은 지연 후 API 호출
      if (isClusterClick) {
        console.log('🔍 클러스터 클릭으로 인한 줌 변경 - 지연 후 API 호출');
        // 클러스터 클릭 후 줌인 완료를 기다린 후 API 호출
        setTimeout(async () => {
          try {
            // 1. 캐시 클리어
            const cache = markerCaches.get(map);
            if (cache) {
              console.log('🧹 클러스터 클릭 후 캐시 클리어');
              cache.clearAll();
            }

            // 2. 현재 지도 정보 가져오기
            const bounds = map.getBounds();
            const center = map.getCenter();

            console.log('🌐 클러스터 클릭 후 API 호출 시작');

            // 3. 직접 API 호출 (줌 레벨 반영)
            const apiParams: FetchStoresParams = {
              swLat: bounds.getSouthWest().getLat(),
              swLng: bounds.getSouthWest().getLng(),
              neLat: bounds.getNorthEast().getLat(),
              neLng: bounds.getNorthEast().getLng(),
              zoomLevel: newZoom,
              // filterState에서 필요한 속성들만 추출하여 타입 변환
              reviewRating: filterState.star > 0 ? filterState.star : undefined,
              minPrice:
                filterState.minPrice && filterState.minPrice > 0 ? filterState.minPrice : undefined,
              maxPrice:
                filterState.maxPrice && filterState.maxPrice > 0 ? filterState.maxPrice : undefined,
              dataCapacity: filterState.dataAmount
                ? filterState.dataAmount === '5GB'
                  ? [5]
                  : filterState.dataAmount === '10GB'
                    ? [10]
                    : filterState.dataAmount === '20GB'
                      ? [20]
                      : filterState.dataAmount === '무제한'
                        ? [999]
                        : undefined
                : undefined,
              is5G:
                filterState.dataType === '5G'
                  ? true
                  : filterState.dataType === '4G/LTE'
                    ? false
                    : undefined,
              maxSupportConnection: filterState.maxSupportConnection
                ? [filterState.maxSupportConnection]
                : undefined,
            };

            const newStores = await fetchStores(apiParams);

            console.log('✅ 클러스터 클릭 후 API 호출 완료:', newStores.length, '개 stores');

            // 4. 직접 마커 렌더링
            if (newStores.length > 0) {
              console.log('🎯 클러스터 클릭 후 직접 마커 렌더링 시작');
              await debouncedRenderMarkers(
                map,
                newStores,
                filterState,
                onStoreMarkerClick,
                undefined,
              );
              console.log('✅ 클러스터 클릭 후 마커 렌더링 완료');
            } else {
              console.log('ℹ️ 클러스터 클릭 후 새로운 stores가 없음');
            }

            // 5. 줌 변경 콜백 호출
            if (onZoomLevelChange) {
              onZoomLevelChange(newZoom, {
                lat: center.getLat(),
                lng: center.getLng(),
              });
            }

            console.log('🎯 클러스터 클릭 후 줌 변경 처리 완료');
          } catch (error) {
            console.error('❌ 클러스터 클릭 후 줌 변경 처리 중 오류:', error);
          }
        }, 100); // 100ms 지연 후 API 호출
        return;
      }

      try {
        // 1. 캐시 클리어
        const cache = markerCaches.get(map);
        if (cache) {
          console.log('🧹 줌 변경으로 인한 캐시 클리어');
          cache.clearAll();
        }

        // 2. 현재 지도 정보 가져오기
        const bounds = map.getBounds();
        const center = map.getCenter();

        console.log('🌐 줌 변경으로 인한 직접 API 호출 시작');

        // 3. 직접 API 호출 (줌 레벨 반영)
        const apiParams: FetchStoresParams = {
          swLat: bounds.getSouthWest().getLat(),
          swLng: bounds.getSouthWest().getLng(),
          neLat: bounds.getNorthEast().getLat(),
          neLng: bounds.getNorthEast().getLng(),
          zoomLevel: newZoom,
          // filterState에서 필요한 속성들만 추출하여 타입 변환
          reviewRating: filterState.star > 0 ? filterState.star : undefined,
          minPrice:
            filterState.minPrice && filterState.minPrice > 0 ? filterState.minPrice : undefined,
          maxPrice:
            filterState.maxPrice && filterState.maxPrice > 0 ? filterState.maxPrice : undefined,
          dataCapacity: filterState.dataAmount
            ? filterState.dataAmount === '5GB'
              ? [5]
              : filterState.dataAmount === '10GB'
                ? [10]
                : filterState.dataAmount === '20GB'
                  ? [20]
                  : filterState.dataAmount === '무제한'
                    ? [999]
                    : undefined
            : undefined,
          is5G:
            filterState.dataType === '5G'
              ? true
              : filterState.dataType === '4G/LTE'
                ? false
                : undefined,
          maxSupportConnection: filterState.maxSupportConnection
            ? [filterState.maxSupportConnection]
            : undefined,
        };

        const newStores = await fetchStores(apiParams);

        console.log('✅ 줌 변경으로 인한 API 호출 완료:', newStores.length, '개 stores');

        // 4. 직접 마커 렌더링
        if (newStores.length > 0) {
          console.log('🎯 줌 변경으로 인한 직접 마커 렌더링 시작');
          await debouncedRenderMarkers(map, newStores, filterState, onStoreMarkerClick, undefined);
          console.log('✅ 줌 변경으로 인한 마커 렌더링 완료');
        } else {
          console.log('ℹ️ 줌 변경 후 새로운 stores가 없음');
        }

        // 5. 줌 변경 콜백 호출
        if (onZoomLevelChange) {
          onZoomLevelChange(newZoom, {
            lat: center.getLat(),
            lng: center.getLng(),
          });
        }

        console.log('🎯 줌 변경 통합 처리 완료');
      } catch (error) {
        console.error('❌ 줌 변경 처리 중 오류:', error);
      }
    };

    // 초기 줌 레벨 설정
    setZoomLevel(map.getLevel());

    window.kakao.maps.event.addListener(map, 'zoom_changed', listener);

    return () => {
      window.kakao.maps.event.removeListener(map, 'zoom_changed', listener);
    };
  }, [map, filterState, onStoreMarkerClick, onZoomLevelChange]);

  // 줌 변경 상태를 리셋하는 함수
  const resetZoomChanged = () => {
    setZoomChanged(false);
  };

  return {
    zoomLevel,
    zoomChanged,
    resetZoomChanged,
  };
};
