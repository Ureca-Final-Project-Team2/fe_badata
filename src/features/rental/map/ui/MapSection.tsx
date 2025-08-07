'use client';

import { memo, useEffect, useMemo, useState } from 'react';

import { useCurrentLocationMarker } from '@/features/rental/map/hooks/useCurrentLocationMarkerHooks';
import { useFetchStoresHooks } from '@/features/rental/map/hooks/useFetchStoresHooks';
import { useKakaoMapHooks } from '@/features/rental/map/hooks/useKakaoMapHooks';
import { useMapZoomLevel } from '@/features/rental/map/hooks/useMapZoomLevel';
import { useMarkerRendering } from '@/features/rental/map/hooks/useMarkerRenderingrHooks';
import { Loading } from '@/shared/ui/Loading';

import type { StoreDetail, StoreDevice } from '@/features/rental/map/lib/types';
import type { RentalFilterState } from '@/features/rental/map/model/rentalFilterReducer';

export interface MapSectionProps {
  filterState: RentalFilterState;
  initialLat?: number;
  initialLng?: number;
  onStoreMarkerClick?: (
    devices: StoreDevice[],
    storeDetail?: StoreDetail,
    storeId?: number,
  ) => void;
  onMapClick?: (event?: MouseEvent) => void;
  onMapReady?: (map: kakao.maps.Map) => void;
  hasUrlParams?: boolean;
  selectedStoreId?: number | null;
  userLat?: number;
  userLng?: number;
  expandedMarkers?: Set<number>; // 확장된 마커들의 ID Set
}

export const MapSection = memo(function MapSection({
  filterState,
  initialLat,
  initialLng,
  onStoreMarkerClick,
  onMapClick,
  onMapReady,
  hasUrlParams = false,
  selectedStoreId,
  userLat,
  userLng,
  expandedMarkers,
}: MapSectionProps) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // 메모이제이션된 props로 불필요한 리렌더링 방지
  const memoizedProps = useMemo(
    () => ({
      initialLat,
      initialLng,
      userLat,
      userLng,
    }),
    [initialLat, initialLng, userLat, userLng],
  );

  const { mapRef, map } = useKakaoMapHooks(
    memoizedProps.initialLat,
    memoizedProps.initialLng,
    memoizedProps.userLat,
    memoizedProps.userLng,
  );

  const { stores } = useFetchStoresHooks(map, filterState);

  // ✅ 줌 레벨 변경 통합 관리 (근본적 해결)
  useMapZoomLevel(map, filterState, onStoreMarkerClick);

  const { isMapReadyRef } = useMarkerRendering(
    map,
    stores,
    filterState,
    onStoreMarkerClick,
    selectedStoreId,
    expandedMarkers,
  );

  // 지도가 준비되면 로딩 상태 해제 및 지도 클릭 이벤트 등록
  useEffect(() => {
    if (map) {
      setIsMapLoaded(true);

      // 지도 클릭 이벤트 등록
      if (onMapClick) {
        window.kakao.maps.event.addListener(map, 'click', (event: MouseEvent) => {
          onMapClick(event);
        });
      }
    }
  }, [map, onMapClick]);

  useCurrentLocationMarker(
    map,
    hasUrlParams,
    (mapInstance) => {
      onMapReady?.(mapInstance);
    },
    isMapReadyRef,
    memoizedProps.userLat,
    memoizedProps.userLng,
  );

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapRef}
        className="w-full h-full"
        style={{
          // 레이아웃 시프트 방지를 위한 최소 높이 설정
          minHeight: '400px',
          // GPU 가속 활성화
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      />
      {!isMapLoaded && (
        <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
          <Loading size="lg" />
        </div>
      )}
    </div>
  );
});
