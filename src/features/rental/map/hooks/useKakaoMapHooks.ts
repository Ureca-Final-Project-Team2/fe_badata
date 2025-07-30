import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    kakao: typeof kakao;
  }
}

export const useKakaoMapHooks = (initialLat?: number, initialLng?: number) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  useEffect(() => {
    console.log('🗺️ 카카오맵 초기화 시작');

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (!mapRef.current) {
          return;
        }

        // 초기 좌표 결정: URL 파라미터가 있으면 해당 좌표, 없으면 선릉 좌표
        const initialCenter =
          initialLat && initialLng
            ? new window.kakao.maps.LatLng(initialLat, initialLng)
            : new window.kakao.maps.LatLng(37.24954834707699, 127.02894277555716);

        const map = new window.kakao.maps.Map(mapRef.current, {
          center: initialCenter,
          level: 4,
        });

        setMap(map);

        console.log('✅ 맵 초기화 완료');
      });
    };

    script.onerror = () => {
      console.error('❌ 카카오맵 스크립트 로드 실패');
    };

    document.head.appendChild(script);
  }, []);

  return { mapRef, map };
};
