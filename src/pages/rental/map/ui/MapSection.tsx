'use client';

import { useEffect } from 'react';

import { renderStoreMarkers } from '@/pages/rental/map/lib/renderStoreMarkers';
import { useFetchStoresHooks } from '@/pages/rental/map/model/useFetchStoresHooks';
import { useKakaoMapHooks } from '@/pages/rental/map/model/useKakaoMapHooks';

import type { StoreDevice } from '@/pages/rental/map/lib/types';
import type { StoreDetail } from '@/pages/rental/store/store-detail/lib/types';

interface MapSectionProps {
  onStoreMarkerClick?: (devices: StoreDevice[], storeDetail?: StoreDetail) => void;
}

export const MapSection = ({ onStoreMarkerClick }: MapSectionProps) => {
  const { mapRef, map } = useKakaoMapHooks();
  const stores = useFetchStoresHooks(map);

  useEffect(() => {
    if (!map || stores.isLoading) return;
    renderStoreMarkers(map, stores.stores, (devices, storeDetail) => {
      onStoreMarkerClick?.(devices, storeDetail);
    });
  }, [map, stores.stores, stores.isLoading, onStoreMarkerClick]);

  return <div ref={mapRef} className="w-full h-full" />;
};
