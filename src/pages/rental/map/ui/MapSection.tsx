'use client';

import { useEffect } from 'react';

import { renderStoreMarkers } from '@/pages/rental/map/lib/renderStoreMarkers';
import { useFetchStoresHooks } from '@/pages/rental/map/model/useFetchStoresHooks';
import { useKakaoMapHooks } from '@/pages/rental/map/model/useKakaoMapHooks';

export const MapSection = () => {
  const { mapRef, map } = useKakaoMapHooks();
  const stores = useFetchStoresHooks(map);

  useEffect(() => {
    if (!map || stores.isLoading) return;
    renderStoreMarkers(map, stores.stores);
  }, [map, stores.stores, stores.isLoading]);

  return <div ref={mapRef} className="w-full h-full" />;
};
