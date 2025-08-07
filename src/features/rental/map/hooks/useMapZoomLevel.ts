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
      const isClusterClick = getClusterClickActive();

      setZoomLevel(newZoom);
      setZoomChanged(true);

      // 클러스터 클릭으로 인한 줌 변경이면 짧은 지연 후 API 호출
      if (isClusterClick) {
        setTimeout(async () => {
          try {
            // 1. 캐시 클리어
            const cache = markerCaches.get(map);
            if (cache) {
              cache.clearAll();
            }

            // 2. 현재 지도 정보 가져오기
            const bounds = map.getBounds();
            const center = map.getCenter();

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
                  ? 5
                  : filterState.dataAmount === '10GB'
                    ? 10
                    : filterState.dataAmount === '20GB'
                      ? 20
                      : filterState.dataAmount === '무제한'
                        ? 999
                        : undefined
                : undefined,
              is5G:
                filterState.dataType === '5G'
                  ? true
                  : filterState.dataType === '4G/LTE'
                    ? false
                    : undefined,
              maxSupportConnection: filterState.maxSupportConnection || undefined,
            };

            const newStores = await fetchStores(apiParams);

            // 4. 직접 마커 렌더링
            if (newStores.length > 0) {
              await debouncedRenderMarkers(
                map,
                newStores,
                filterState,
                onStoreMarkerClick,
                undefined,
              );
            }

            // 5. 줌 변경 콜백 호출
            if (onZoomLevelChange) {
              onZoomLevelChange(newZoom, {
                lat: center.getLat(),
                lng: center.getLng(),
              });
            }
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
          cache.clearAll();
        }

        // 2. 현재 지도 정보 가져오기
        const bounds = map.getBounds();
        const center = map.getCenter();

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
              ? 5
              : filterState.dataAmount === '10GB'
                ? 10
                : filterState.dataAmount === '20GB'
                  ? 20
                  : filterState.dataAmount === '무제한'
                    ? 999
                    : undefined
            : undefined,
          is5G:
            filterState.dataType === '5G'
              ? true
              : filterState.dataType === '4G/LTE'
                ? false
                : undefined,
          maxSupportConnection: filterState.maxSupportConnection || undefined,
        };

        const newStores = await fetchStores(apiParams);

        // 4. 직접 마커 렌더링
        if (newStores.length > 0) {
          await debouncedRenderMarkers(map, newStores, filterState, onStoreMarkerClick, undefined);
        }

        // 5. 줌 변경 콜백 호출
        if (onZoomLevelChange) {
          onZoomLevelChange(newZoom, {
            lat: center.getLat(),
            lng: center.getLng(),
          });
        }
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
