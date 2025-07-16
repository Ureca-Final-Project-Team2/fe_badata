import { useEffect, useState } from 'react';

import { fetchStores } from '@features/stores/map/api/map';
import { Store } from '@features/stores/map/lib/store';

export const useFetchStores = () => {
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const stores = await fetchStores({
          swLat: 33.0,
          swLng: 124.0,
          neLat: 39.0,
          neLng: 132.0,
        });
        setStores(stores);
      } catch (e) {
        console.error('❌ 가맹점 불러오기 실패:', e);
      }
    };

    fetch();
  }, []);

  return stores;
};
