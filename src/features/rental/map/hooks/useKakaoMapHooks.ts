import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    kakao: typeof kakao;
  }
}

export const useKakaoMapHooks = (
  initialLat?: number,
  initialLng?: number,
  userLat?: number,
  userLng?: number,
) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const initializedRef = useRef(false);

  useEffect(() => {
    // 이미 초기화되었거나 필수 값이 없으면 무시
    if (initializedRef.current) {
      return;
    }

    // 검색 위치가 없고 사용자 위치도 없으면 초기화 지연
    if (!initialLat && !initialLng && (!userLat || !userLng)) {
      console.log('📍 초기화 지연: 검색 위치와 사용자 위치 모두 없음');
      return;
    }

    console.log('🗺️ 카카오맵 초기화 시작');

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (!mapRef.current) {
          return;
        }

        // 초기 좌표 결정: 검색 위치 > 사용자 현재 위치 > 기본값
        let initialCenter: kakao.maps.LatLng;

        if (initialLat && initialLng) {
          // 검색 위치가 있으면 검색 위치로 초기 카메라 설정
          initialCenter = new window.kakao.maps.LatLng(initialLat, initialLng);
          console.log('📍 검색 위치로 초기 카메라 설정:', { lat: initialLat, lng: initialLng });
        } else if (userLat && userLng) {
          // 검색 위치가 없고 사용자 위치가 있으면 사용자 위치로 초기 카메라 설정
          initialCenter = new window.kakao.maps.LatLng(userLat, userLng);
          console.log('📍 사용자 현재 위치로 초기 카메라 설정:', { lat: userLat, lng: userLng });
        } else {
          // 둘 다 없으면 기본값 사용
          initialCenter = new window.kakao.maps.LatLng(37.5665, 126.978);
          console.log('📍 기본 위치로 초기 카메라 설정');
        }

        const map = new window.kakao.maps.Map(mapRef.current!, {
          center: initialCenter,
          level: 4,
        });

        // zoom level 변경 이벤트 리스너 추가
        console.log('🎯 Zoom 이벤트 리스너 등록 시작');
        window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
          console.log('🔍 Zoom Level 변경 감지됨!');
          const zoomLevel = map.getLevel();
          const center = map.getCenter();
          const bounds = map.getBounds();

          console.log('🔍 Zoom Level 변경 감지:', {
            zoomLevel,
            center: {
              lat: center.getLat(),
              lng: center.getLng(),
            },
            bounds: {
              swLat: bounds.getSouthWest().getLat(),
              swLng: bounds.getSouthWest().getLng(),
              neLat: bounds.getNorthEast().getLat(),
              neLng: bounds.getNorthEast().getLng(),
            },
            mapInfo: {
              centerLat: center.getLat(),
              centerLng: center.getLng(),
              zoomLevel: zoomLevel,
            },
          });
        });

        // bounds 변경 이벤트도 추가
        window.kakao.maps.event.addListener(map, 'bounds_changed', () => {
          console.log('🗺️ Bounds 변경 감지됨!');
          const zoomLevel = map.getLevel();
          const center = map.getCenter();
          const bounds = map.getBounds();

          console.log('🗺️ Bounds 변경 감지:', {
            zoomLevel,
            center: {
              lat: center.getLat(),
              lng: center.getLng(),
            },
            bounds: {
              swLat: bounds.getSouthWest().getLat(),
              swLng: bounds.getSouthWest().getLng(),
              neLat: bounds.getNorthEast().getLat(),
              neLng: bounds.getNorthEast().getLng(),
            },
          });
        });

        // 드래그 종료 이벤트도 추가
        window.kakao.maps.event.addListener(map, 'dragend', () => {
          console.log('🖱️ 드래그 종료 감지됨!');
          const zoomLevel = map.getLevel();
          const center = map.getCenter();
          const bounds = map.getBounds();

          console.log('🖱️ 드래그 종료 감지:', {
            zoomLevel,
            center: {
              lat: center.getLat(),
              lng: center.getLng(),
            },
            bounds: {
              swLat: bounds.getSouthWest().getLat(),
              swLng: bounds.getSouthWest().getLng(),
              neLat: bounds.getNorthEast().getLat(),
              neLng: bounds.getNorthEast().getLng(),
            },
          });
        });

        console.log('✅ Zoom 이벤트 리스너 등록 완료');

        // 지도 로드 완료 이벤트도 추가
        window.kakao.maps.event.addListener(map, 'tilesloaded', () => {
          console.log('🗺️ 지도 타일 로드 완료!');
        });

        setMap(map);
        setIsMapReady(true);
        initializedRef.current = true;
        console.log('✅ 맵 초기화 완료');
      });
    };

    script.onerror = () => {
      console.error('❌ 카카오맵 스크립트 로드 실패');
    };

    document.head.appendChild(script);
  }, [initialLat, initialLng, userLat, userLng]);

  return { mapRef, map, isMapReady };
};
