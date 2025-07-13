'use client';

import { useEffect, useRef, useState } from 'react';
import { fetchShops } from '@features/shops/apis/fetchShops';
import type { Shop } from '@models/shop';

declare global {
  interface Window {
    kakao: any;
  }
}

const RentalPage = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [shops, setShops] = useState<Shop[]>([]);

  // 1. Kakao 지도 로딩 및 생성
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = mapRef.current;
        if (!container) return;

        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울 중심
          level: 4,
        };

        const createdMap = new window.kakao.maps.Map(container, options);
        setMap(createdMap);
      });
    };

    document.head.appendChild(script);
  }, []);

  // 2. 가맹점 데이터 fetch
  useEffect(() => {
    const getShops = async () => {
      try {
        const params = {
          swLat: 33.0,
          swLng: 124.0,
          neLat: 39.0,
          neLng: 132.0,
        };
        const fetched = await fetchShops(params);
        setShops(fetched);
        console.log('✅ fetch 성공:', fetched);
      } catch (error) {
        console.error('❌ 가맹점 불러오기 실패:', error);
      }
    };

    getShops();
  }, []);

  // 3. 마커 표시 (지도, shops 모두 준비되었을 때)
  useEffect(() => {
    if (!map || shops.length === 0 || !window.kakao) return;

    shops.forEach((shop) => {
      const markerPosition = new window.kakao.maps.LatLng(shop.latitude, shop.longititude);
      const marker = new window.kakao.maps.Marker({
        map,
        position: markerPosition,
      });

      // 예: 마커에 이름 툴팁 추가
      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px;font-size:14px;">${shop.name}</div>`,
      });

      window.kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
      window.kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());
    });
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
