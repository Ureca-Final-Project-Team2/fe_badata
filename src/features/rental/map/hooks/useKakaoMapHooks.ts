import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    kakao: typeof kakao;
  }
}

// 현재 위치 마커를 한 번만 생성하는 함수
const createCurrentLocationMarker = (map: kakao.maps.Map): kakao.maps.Marker => {
  console.log('📍 현재 위치 마커 생성 시작');

  // 현재 위치 마커 생성
  const currentLocationMarker = new window.kakao.maps.Marker({
    map: map,
    position: map.getCenter(), // 초기 위치는 지도 중심
  });

  console.log('📍 현재 위치 마커 생성 완료');

  // 현재 위치로 이동하는 함수
  const moveToCurrentLocation = () => {
    console.log('📍 현재 위치로 이동 시도');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const currentPosition = new window.kakao.maps.LatLng(lat, lng);

          console.log('📍 현재 위치 획득:', { lat, lng });

          // 마커 위치 업데이트
          currentLocationMarker.setPosition(currentPosition);

          // 지도 중심을 현재 위치로 이동
          map.setCenter(currentPosition);
        },
        (error) => {
          console.error('❌ 현재 위치를 가져올 수 없습니다:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
      );
    } else {
      console.error('❌ 이 브라우저에서는 위치 정보를 지원하지 않습니다.');
    }
  };

  // 초기 로드 시 현재 위치로 이동
  moveToCurrentLocation();

  // 현재 위치 마커 클릭 시 현재 위치로 다시 이동
  window.kakao.maps.event.addListener(currentLocationMarker, 'click', () => {
    moveToCurrentLocation();
  });

  return currentLocationMarker;
};

export const useKakaoMapHooks = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const currentLocationMarkerRef = useRef<kakao.maps.Marker | null>(null);

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

        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(35.1796, 129.0756), // 부산 좌표로 변경
          level: 4,
        });

        setMap(map);

        // 현재 위치 마커를 맵 생성 시 한 번만 생성
        currentLocationMarkerRef.current = createCurrentLocationMarker(map);

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
