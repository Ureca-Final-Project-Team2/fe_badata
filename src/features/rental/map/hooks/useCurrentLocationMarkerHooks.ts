import { useEffect, useRef } from 'react';

import { createCurrentLocationMarker } from '@/features/rental/map/lib/currentLocationMarker';

// 현재 위치 마커 관리를 위한 커스텀 훅
export const useCurrentLocationMarker = (
  map: kakao.maps.Map | null,
  hasUrlParams: boolean,
  onMapClick?: (event?: MouseEvent) => void,
  onMapReady?: (map: kakao.maps.Map) => void,
  isMapReadyRef?: React.MutableRefObject<boolean>,
  userLat?: number,
  userLng?: number,
) => {
  const currentLocationMarkerRef = useRef<kakao.maps.CustomOverlay | null>(null);

  // 맵 준비 완료 시 콜백 호출 및 플래그 설정
  useEffect(() => {
    if (map && onMapReady) {
      console.log('🗺️ 맵 준비 완료');
      console.log('📍 hasUrlParams:', hasUrlParams, 'userLat:', userLat, 'userLng:', userLng);

      if (isMapReadyRef) {
        isMapReadyRef.current = true;
      }

      // 지도 클릭 이벤트 추가
      if (onMapClick) {
        window.kakao.maps.event.addListener(map, 'click', (event: MouseEvent) => {
          onMapClick(event);
        });
      }

      onMapReady(map);
    }
  }, [map, onMapReady, onMapClick, isMapReadyRef]);

  // 사용자 위치가 로드되고 검색 파라미터가 없을 때만 마커 생성
  useEffect(() => {
    if (map && userLat && userLng) {
      if (!hasUrlParams) {
        console.log('📍 현재 위치 마커 생성 시작');
        // 기존 마커가 있다면 제거
        if (currentLocationMarkerRef.current) {
          currentLocationMarkerRef.current.setMap(null);
          currentLocationMarkerRef.current = null;
        }

        // 새로운 마커 생성
        currentLocationMarkerRef.current = createCurrentLocationMarker(map, userLat, userLng);
      } else {
        console.log('📍 검색 파라미터가 있으므로 현재 위치 마커 생성하지 않음');
        // 기존 마커가 있다면 제거
        if (currentLocationMarkerRef.current) {
          currentLocationMarkerRef.current.setMap(null);
          currentLocationMarkerRef.current = null;
        }
      }
    }
  }, [map, userLat, userLng, hasUrlParams]);

  return { currentLocationMarkerRef };
};
