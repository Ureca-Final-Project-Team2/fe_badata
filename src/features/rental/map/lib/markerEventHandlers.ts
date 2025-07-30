import { fetchStoreDetail } from '@/features/rental/map/api/apis';

import type { Store, StoreDetail, StoreDevice } from '@/features/rental/map/lib/types';

// 마커 이벤트 리스너 설정 함수
export const setupMarkerEventListeners = (
  marker: kakao.maps.Marker,
  map: kakao.maps.Map,
  infowindow: kakao.maps.InfoWindow,
  store: Store,
  safeDevices: StoreDevice[],
  onStoreMarkerClick?: (
    devices: StoreDevice[],
    storeDetail?: StoreDetail,
    storeId?: number,
  ) => void,
) => {
  window.kakao.maps.event.addListener(marker, 'mouseover', () => {
    infowindow.open(map, marker);
  });

  window.kakao.maps.event.addListener(marker, 'mouseout', () => {
    infowindow.close();
  });

  window.kakao.maps.event.addListener(marker, 'click', async () => {
    let storeDetail: StoreDetail | undefined = undefined;
    try {
      const center = map.getCenter();
      const lat = center.getLat();
      const lng = center.getLng();
      storeDetail = await fetchStoreDetail(store.id, lat, lng);
    } catch (error) {
      console.error('상세 정보 조회 실패:', error);
    }
    if (onStoreMarkerClick) onStoreMarkerClick(safeDevices, storeDetail, store.id);
  });
};
