import { useEffect, useRef } from 'react';

import { createCurrentLocationMarker } from '@/features/rental/map/lib/currentLocationMarker';

// 현재 위치 마커 관리를 위한 커스텀 훅
export const useCurrentLocationMarker = (
  map: kakao.maps.Map | null,
  hasUrlParams: boolean,
  onMapClick?: () => void,
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

      // 검색 파라미터가 없을 때만 현재 위치 마커 생성
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
      }

      // 지도 클릭 이벤트 추가
      if (onMapClick) {
        window.kakao.maps.event.addListener(map, 'click', () => {
          onMapClick();
        });
      }

      onMapReady(map);
    }
  }, [map, onMapReady, onMapClick, hasUrlParams, isMapReadyRef, userLat, userLng]);

  // 사용자 위치가 변경될 때 마커 위치 업데이트 (검색 파라미터가 없을 때만)
  useEffect(() => {
    if (map && currentLocationMarkerRef.current && userLat && userLng && !hasUrlParams) {
      // 기존 마커 제거
      currentLocationMarkerRef.current.setMap(null);

      // 새로운 위치에 마커 생성
      currentLocationMarkerRef.current = createCurrentLocationMarker(map, userLat, userLng);
    }
  }, [map, userLat, userLng, hasUrlParams]);

  return { currentLocationMarkerRef };
};
