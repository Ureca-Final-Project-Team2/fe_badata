import { fetchStoreDetail } from '@/features/rental/map/api/apis';

import type { StoreDetail, StoreDevice } from '@/features/rental/map/lib/types';

// 마커 타입 정의 (기존 Marker 또는 새로운 CustomOverlay)
type MarkerType = kakao.maps.Marker | kakao.maps.CustomOverlay;

// 마커 이벤트 리스너 설정 함수
export const setupMarkerEventListeners = (
  marker: MarkerType,
  infowindow: kakao.maps.InfoWindow,
  map: kakao.maps.Map,
  storeId: number,
  isCluster: boolean,
  onStoreMarkerClick?: (
    devices: StoreDevice[],
    storeDetail?: StoreDetail,
    storeId?: number,
  ) => void,
  safeDevices: StoreDevice[] = [],
) => {
  // 마커 타입에 따라 이벤트 리스너 설정
  if (marker instanceof window.kakao.maps.Marker) {
    // 기존 Marker 이벤트 리스너
    window.kakao.maps.event.addListener(marker, 'mouseover', () => {
      infowindow.open(map, marker);
    });

    window.kakao.maps.event.addListener(marker, 'mouseout', () => {
      infowindow.close();
    });

    window.kakao.maps.event.addListener(marker, 'click', async () => {
      // 모든 마커 클릭 허용
      let storeDetail: StoreDetail | undefined = undefined;
      try {
        const center = map.getCenter();
        const lat = center.getLat();
        const lng = center.getLng();
        storeDetail = await fetchStoreDetail(storeId, lat, lng);
      } catch (error) {
        console.error('상세 정보 조회 실패:', error);
      }
      if (onStoreMarkerClick) onStoreMarkerClick(safeDevices, storeDetail, storeId);
    });
  } else if (marker instanceof window.kakao.maps.CustomOverlay) {
    // CustomOverlay는 이미 클릭 이벤트가 설정되어 있으므로 추가 이벤트만 설정
    // 물방울 마커는 클릭 시 크기 변경과 DeviceCard 표시가 이미 dropletMarker.ts에서 처리됨
  }
};
