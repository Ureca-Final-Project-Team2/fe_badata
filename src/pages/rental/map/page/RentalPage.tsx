'use client';

import { useEffect } from 'react';

import { renderStoreMarkers } from '@/pages/rental/map/lib/renderStoreMarkers';
import { useFetchStoresHooks } from '@/pages/rental/map/model/useFetchStoresHooks';
import { useKakaoMapHooks } from '@/pages/rental/map/model/useKakaoMapHooks';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header } from '@/shared/ui/Header';

const RentalPage = () => {
  const { mapRef, map } = useKakaoMapHooks();
  const stores = useFetchStoresHooks();

  useEffect(() => {
    if (!map || stores.isLoading) return;
    renderStoreMarkers(map, stores.stores);
  }, [map, stores.stores, stores.isLoading]);

  return (
    <BaseLayout header={<Header />}>
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: 'calc(100vh - 140px)', // 헤더(70px) + 바텀네비(70px) 제외
          border: '1px solid #ccc',
          borderRadius: '8px',
        }}
      />
    </BaseLayout>
  );
};

export default RentalPage;
