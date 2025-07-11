'use client';

import { useEffect } from 'react';
import { fetchShops } from '@features/shops/apis/fetchShops';
import type { Shop } from '@models/shop';

const RentalPage = () => {
  useEffect(() => {
    const getShops = async () => {
      try {
        const shops: Shop[] = await fetchShops();
        console.log('가맹점 목록:', shops);
      } catch (error) {
        console.error('가맹점 불러오기 실패:', error);
      }
    };

    getShops();
  }, []);

  return <></>;
};

export default RentalPage;
