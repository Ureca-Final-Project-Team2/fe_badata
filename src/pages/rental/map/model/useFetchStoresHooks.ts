import { useEffect, useState } from 'react';

import { fetchStores } from '@/pages/rental/map/api/apis';

import type { Store } from '@/pages/rental/map/lib/types';

export const useFetchStoresHooks = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        console.error('가맹점 불러오기 실패:', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  return { stores, isLoading };
};
