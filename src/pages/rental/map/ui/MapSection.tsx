'use client';

import { useEffect } from 'react';

import { renderStoreMarkers } from '@/pages/rental/map/lib/renderStoreMarkers';
import { useFetchStoresHooks } from '@/pages/rental/map/model/useFetchStoresHooks';
import { useKakaoMapHooks } from '@/pages/rental/map/model/useKakaoMapHooks';

import type { StoreDevice } from '@/pages/rental/map/lib/types';
import type { RentalFilterState } from '@/pages/rental/map/model/rentalFilterReducer';
import type { StoreDetail } from '@/pages/rental/store/store-detail/lib/types';

interface MapSectionProps {
  filterState: RentalFilterState;
  onStoreMarkerClick?: (
    devices: StoreDevice[],
    storeDetail?: StoreDetail,
    storeId?: number,
  ) => void;
}

export const MapSection = ({ filterState, onStoreMarkerClick }: MapSectionProps) => {
  const { mapRef, map } = useKakaoMapHooks();
  const stores = useFetchStoresHooks(map, filterState);

  useEffect(() => {
    if (!map || stores.isLoading) return;
    renderStoreMarkers(map, stores.stores, filterState, (devices, storeDetail, storeId) => {
      onStoreMarkerClick?.(devices, storeDetail, storeId);
    });
  }, [map, stores.stores, stores.isLoading, filterState, onStoreMarkerClick]);

  return <div ref={mapRef} className="w-full h-full" />;
};
