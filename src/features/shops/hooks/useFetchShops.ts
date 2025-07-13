import { useEffect, useState } from 'react';
import { fetchShops } from '../apis/fetchShops';
import type { Shop } from '@models/shop';

export const useFetchShops = () => {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const shops = await fetchShops({
          swLat: 33.0,
          swLng: 124.0,
          neLat: 39.0,
          neLng: 132.0,
        });
        setShops(shops);
      } catch (e) {
        console.error('❌ 가맹점 불러오기 실패:', e);
      }
    };

    fetch();
  }, []);

  return shops;
};
