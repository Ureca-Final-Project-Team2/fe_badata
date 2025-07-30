'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useFetchStoresHooks } from '@/features/rental/map/hooks/useFetchStoresHooks';
import { useKakaoMapHooks } from '@/features/rental/map/hooks/useKakaoMapHooks';
import { createCurrentLocationMarker } from '@/features/rental/map/lib/currentLocationMarker';
import { debouncedRenderMarkers } from '@/features/rental/map/lib/renderStoreMarkers';

import type { Store, StoreDetail, StoreDevice } from '@/features/rental/map/lib/types';
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
  onMapClick?: () => void;
  onMapReady?: (map: kakao.maps.Map) => void;
  hasUrlParams?: boolean;
  selectedStoreId?: number | null;
}

export function MapSection({
  filterState,
  initialLat,
  initialLng,
  onStoreMarkerClick,
  onMapClick,
  onMapReady,
  hasUrlParams = false,
  selectedStoreId,
}: MapSectionProps) {
  const { mapRef, map } = useKakaoMapHooks(initialLat, initialLng);
  const { stores, isLoading } = useFetchStoresHooks(map, filterState);

  const lastStoresRef = useRef<Store[]>([]);
  const lastFilterStateRef = useRef<RentalFilterState>(filterState);
  const isMapReadyRef = useRef(false);
  const currentLocationMarkerRef = useRef<kakao.maps.CustomOverlay | null>(null);

  // 마커 렌더링 함수
  const renderMarkers = useCallback(async () => {
    if (!map) {
      return;
    }
    debouncedRenderMarkers(map, stores, filterState, onStoreMarkerClick, selectedStoreId);
  }, [map, stores, filterState, onStoreMarkerClick, selectedStoreId]);

  // stores나 filterState가 변경되었을 때만 마커 렌더링
  const shouldRenderMarkers = useMemo(() => {
    const storesChanged = JSON.stringify(stores) !== JSON.stringify(lastStoresRef.current);
    const filterChanged =
      JSON.stringify(filterState) !== JSON.stringify(lastFilterStateRef.current);

    // 맵이 준비되지 않았으면 렌더링하지 않음
    if (!isMapReadyRef.current) {
      return false;
    }

    if (storesChanged || filterChanged) {
      lastStoresRef.current = stores;
      lastFilterStateRef.current = filterState;
      return true;
    }
    return false;
  }, [stores, filterState]);

  // 마커 렌더링 효과
  useEffect(() => {
    if (shouldRenderMarkers) {
      console.log('🎯 마커 렌더링 실행');
      renderMarkers();
    }
  }, [shouldRenderMarkers, renderMarkers]);

  // 맵 준비 완료 시 콜백 호출 및 플래그 설정
  useEffect(() => {
    if (map && onMapReady) {
      console.log('🗺️ 맵 준비 완료');
      isMapReadyRef.current = true;

      // URL 파라미터가 없을 때만 현재 위치 마커 생성 (실제 사용자 현재 위치일 때)
      if (!currentLocationMarkerRef.current && !hasUrlParams) {
        console.log('📍 현재 위치 마커 생성 (사용자 실제 위치)');
        currentLocationMarkerRef.current = createCurrentLocationMarker(map);
      }

      // 지도 클릭 이벤트 추가
      if (onMapClick) {
        window.kakao.maps.event.addListener(map, 'click', () => {
          onMapClick();
        });
      }

      onMapReady(map);
    }
  }, [map, onMapReady, onMapClick, hasUrlParams]);

  return <div ref={mapRef} className="w-full h-full" />;
}
