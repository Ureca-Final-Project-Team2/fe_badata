'use client';

import { useEffect } from 'react';

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

  useEffect(() => {
    if (!map) return;
    // stores, filterState가 바뀔 때마다 마커를 다시 렌더링
    renderStoreMarkers(map, stores, filterState, onStoreMarkerClick);
  }, [map, stores, filterState, onStoreMarkerClick]);

  useEffect(() => {
    if (map && onMapReady) {
      onMapReady(map);
    }
  }, [map, onMapReady]);

  return <div ref={mapRef} className="w-full h-full" />;
};
