'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useFetchStoresHooks } from '@/features/rental/map/hooks/useFetchStoresHooks';
import { useKakaoMapHooks } from '@/features/rental/map/hooks/useKakaoMapHooks';
import { renderStoreMarkers } from '@/features/rental/map/lib/renderStoreMarkers';

import type { StoreDetail, StoreDevice } from '@/features/rental/map/lib/types';
import type { RentalFilterState } from '@/features/rental/map/model/rentalFilterReducer';

interface MapSectionProps {
  filterState: RentalFilterState;
  onStoreMarkerClick?: (
    devices: StoreDevice[],
    storeDetail?: StoreDetail,
    storeId?: number,
  ) => void;
  onMapReady?: (map: kakao.maps.Map) => void;
}

export const MapSection = ({ filterState, onStoreMarkerClick, onMapReady }: MapSectionProps) => {
  const { mapRef, map } = useKakaoMapHooks();
  const storesResult = useFetchStoresHooks(map, filterState);
  const stores = storesResult.stores;

  // 마커 렌더링 디바운싱을 위한 ref
  const renderTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastStoresRef = useRef<typeof stores>([]);
  const lastFilterStateRef = useRef<RentalFilterState>(filterState);

  // 마커 렌더링 함수를 메모이제이션
  const renderMarkers = useCallback(async () => {
    if (!map) return;

    // 기존 타이머가 있다면 취소
    if (renderTimeoutRef.current) {
      clearTimeout(renderTimeoutRef.current);
    }

    // 디바운싱 적용 (200ms)
    renderTimeoutRef.current = setTimeout(async () => {
      await renderStoreMarkers(map, stores, filterState, onStoreMarkerClick);
    }, 200);
  }, [map, stores, filterState, onStoreMarkerClick]);

  // stores나 filterState가 변경되었을 때만 마커 렌더링
  const shouldRenderMarkers = useMemo(() => {
    const storesChanged = JSON.stringify(stores) !== JSON.stringify(lastStoresRef.current);
    const filterChanged =
      JSON.stringify(filterState) !== JSON.stringify(lastFilterStateRef.current);

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
      renderMarkers();
    }
  }, [shouldRenderMarkers, renderMarkers]);

  // 맵 준비 완료 시 콜백 호출
  useEffect(() => {
    if (map && onMapReady) {
      onMapReady(map);
    }
  }, [map, onMapReady]);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (renderTimeoutRef.current) {
        clearTimeout(renderTimeoutRef.current);
      }
    };
  }, []);

  return <div ref={mapRef} className="w-full h-full" />;
};
