'use client';

import { useFetchStores } from '@features/stores/map/hooks/useFetchStores';
import { useKakaoMap } from '@features/stores/map/hooks/useKakaoMap';
import { renderStoreMarkers } from '@features/stores/map/utils/renderStoreMarkers';
import { useEffect } from 'react';

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
