'use client';

import { useEffect } from 'react';
import { useKakaoMap } from '@features/shops/hooks/useKakaoMap';
import { useFetchShops } from '@features/shops/hooks/useFetchShops';
import { renderShopMarkers } from '@features/shops/utils/renderShopMarkers';

const RentalPage = () => {
  const { mapRef, map } = useKakaoMap();
  const shops = useFetchShops();

  useEffect(() => {
    renderShopMarkers(map, shops);
  }, [map, shops]);

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
