import { useEffect, useRef } from 'react';

import { createCurrentLocationMarker } from '@/features/rental/map/lib/currentLocationMarker';

// 현재 위치 마커 관리를 위한 커스텀 훅
export const useCurrentLocationMarker = (
  map: kakao.maps.Map | null,
  hasUrlParams: boolean,
  onMapClick?: () => void,
  onMapReady?: (map: kakao.maps.Map) => void,
  isMapReadyRef?: React.MutableRefObject<boolean>,
) => {
  const currentLocationMarkerRef = useRef<kakao.maps.CustomOverlay | null>(null);

  // 맵 준비 완료 시 콜백 호출 및 플래그 설정
  useEffect(() => {
    if (map && onMapReady) {
      console.log('🗺️ 맵 준비 완료');
      if (isMapReadyRef) {
        isMapReadyRef.current = true;
      }

      // URL 파라미터가 없을 때만 현재 위치 마커 생성 (실제 사용자 현재 위치일 때)
      if (!currentLocationMarkerRef.current && !hasUrlParams) {
        currentLocationMarkerRef.current = createCurrentLocationMarker(map);
      }

      // 지도 클릭 이벤트 추가
      if (onMapClick) {
        window.kakao.maps.event.addListener(map, 'click', () => {
          onMapClick();
        });
      }

      onMapReady(map);
    }
  }, [map, onMapReady, onMapClick, hasUrlParams, isMapReadyRef]);

  return { currentLocationMarkerRef };
};
