'use client';

import { useEffect, useRef } from 'react';
import { fetchShops } from '@features/shops/apis/fetchShops';
import type { Shop } from '@models/shop';

declare global {
  interface Window {
    kakao: any;
  }
}

const RentalPage = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  // 지도 렌더링
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = mapRef.current;
        if (!container) return;

        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);

        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(33.450701, 126.570667),
        });
        marker.setMap(map);
      });
    };

    document.head.appendChild(script);
  }, []);

  // 가맹점 API 호출
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
