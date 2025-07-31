import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    kakao: typeof kakao;
  }
}

export const useKakaoMapHooks = (initialLat?: number, initialLng?: number) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

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

        // 사용자 GPS 위치를 먼저 가져오기
        const initializeMapWithUserLocation = () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;

                // 초기 좌표 결정: URL 파라미터 > 사용자 GPS > 기본값
                const initialCenter =
                  initialLat && initialLng
                    ? new window.kakao.maps.LatLng(initialLat, initialLng)
                    : new window.kakao.maps.LatLng(userLat, userLng);

                const map = new window.kakao.maps.Map(mapRef.current!, {
                  center: initialCenter,
                  level: 4,
                });

                setMap(map);
                setIsMapReady(true);
                console.log('✅ 맵 초기화 완료 (사용자 위치 기준)');
              },
              (error) => {
                console.log('GPS 위치 획득 실패, 기본 위치 사용:', error.message);

                // fallback: URL 파라미터 > 서울시청
                const fallbackLat = initialLat || 37.5665;
                const fallbackLng = initialLng || 126.978;

                const initialCenter = new window.kakao.maps.LatLng(fallbackLat, fallbackLng);

                const map = new window.kakao.maps.Map(mapRef.current!, {
                  center: initialCenter,
                  level: 4,
                });

                setMap(map);
                setIsMapReady(true);
              },
              {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000, // 5분 캐시 허용
              },
            );
          } else {
            // Geolocation이 지원되지 않는 경우
            const fallbackLat = initialLat || 37.5665;
            const fallbackLng = initialLng || 126.978;

            const initialCenter = new window.kakao.maps.LatLng(fallbackLat, fallbackLng);

            const map = new window.kakao.maps.Map(mapRef.current!, {
              center: initialCenter,
              level: 4,
            });

            setMap(map);
            setIsMapReady(true);
          }
        };

        initializeMapWithUserLocation();
      });
    };

    script.onerror = () => {
      console.error('❌ 카카오맵 스크립트 로드 실패');
    };

    document.head.appendChild(script);
  }, [initialLat, initialLng]);

  return { mapRef, map, isMapReady };
};
