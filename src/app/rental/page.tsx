'use client';

import { useEffect } from 'react';
import { useKakaoMap } from '@/features/stores/hooks/useKakaoMap';
import { useFetchStores } from '@/features/stores/hooks/useFetchStores';
import { renderStoreMarkers } from '@/features/stores/utils/renderStoreMarkers';

const RentalPage = () => {
  const { mapRef, map } = useKakaoMap();
  const stores = useFetchStores();

  useEffect(() => {
    renderStoreMarkers(map, stores);
  }, [map, stores]);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: '500px',
        border: '1px solid #ccc',
        marginTop: '2rem',
      }}
    />
  );
};

export default RentalPage;
