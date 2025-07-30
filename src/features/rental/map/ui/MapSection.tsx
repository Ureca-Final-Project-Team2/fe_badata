'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useFetchStoresHooks } from '@/features/rental/map/hooks/useFetchStoresHooks';
import { useKakaoMapHooks } from '@/features/rental/map/hooks/useKakaoMapHooks';
import { renderStoreMarkers } from '@/features/rental/map/lib/renderStoreMarkers';
import { debounce } from '@/features/rental/map/utils/debounceUtils';

import type { Store, StoreDetail, StoreDevice } from '@/features/rental/map/lib/types';
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

  const lastStoresRef = useRef<Store[]>([]);
  const lastFilterStateRef = useRef<RentalFilterState>(filterState);

  // 디바운스된 마커 렌더링 함수
  const debouncedRenderMarkers = useMemo(
    () =>
      debounce(
        async (
          map: kakao.maps.Map,
          stores: Store[],
          filterState: RentalFilterState,
          onStoreMarkerClick?: (
            devices: StoreDevice[],
            storeDetail?: StoreDetail,
            storeId?: number,
          ) => void,
        ) => {
          await renderStoreMarkers(map, stores, filterState, onStoreMarkerClick);
        },
        200,
      ),
    [],
  );

  // 마커 렌더링 함수를 메모이제이션
  const renderMarkers = useCallback(async () => {
    if (!map) return;

    // 디바운스된 렌더링 함수 호출
    debouncedRenderMarkers(map, stores, filterState, onStoreMarkerClick);
  }, [map, stores, filterState, onStoreMarkerClick, debouncedRenderMarkers]);

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

  return <div ref={mapRef} className="w-full h-full" />;
};
