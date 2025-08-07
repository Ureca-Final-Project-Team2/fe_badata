import { useEffect, useRef } from 'react';

import { createCurrentLocationMarker } from '@/features/rental/map/lib/currentLocationMarker';

// 현재 위치 마커 관리를 위한 커스텀 훅
export const useCurrentLocationMarker = (
  map: kakao.maps.Map | null,
  hasUrlParams: boolean,
  onMapReady?: (map: kakao.maps.Map) => void,
  isMapReadyRef?: React.MutableRefObject<boolean>,
  userLat?: number,
  userLng?: number,
) => {
  const currentLocationMarkerRef = useRef<kakao.maps.CustomOverlay | null>(null);

  // 맵 준비 완료 시 콜백 호출 및 플래그 설정 (한 번만 호출)
  useEffect(() => {
    if (map && onMapReady && isMapReadyRef && !isMapReadyRef.current) {
      isMapReadyRef.current = true;
      onMapReady(map);
    }
  }, [map, onMapReady, isMapReadyRef]);

  // 사용자 위치가 로드되고 검색 파라미터가 없을 때만 마커 생성
  useEffect(() => {
    if (map && userLat && userLng) {
      if (!hasUrlParams) {
        // 기존 마커가 있다면 제거
        if (currentLocationMarkerRef.current) {
          currentLocationMarkerRef.current.setMap(null);
          currentLocationMarkerRef.current = null;
        }

        // 새로운 마커 생성
        currentLocationMarkerRef.current = createCurrentLocationMarker(map, userLat, userLng);
      } else {
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
