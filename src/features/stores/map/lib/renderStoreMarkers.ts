import { fetchStoreDevices } from '@/entities/devices/api/apis';
import { fetchStoreDetail } from '@/pages/rental/map/api/apis';

import type { Store } from '@/pages/rental/map/lib/types';

export const renderStoreMarkers = async (map: kakao.maps.Map, stores: Store[]) => {
  if (!map || !window.kakao || stores.length === 0) {
    console.log('❌ 마커 렌더링 조건 불충족:', {
      map: !!map,
      kakao: !!window.kakao,
      storesCount: stores.length,
    });
    return;
  }

  for (const store of stores) {
    const position = new window.kakao.maps.LatLng(store.latitude, store.longititude);

    // 👉 조건 없이 모든 기기 조회
    const devices = await fetchStoreDevices(store.id, {});
    const safeDevices = Array.isArray(devices) ? devices : [];

    const marker = new window.kakao.maps.Marker({ map, position });

    const overlay = new window.kakao.maps.CustomOverlay({
      position,
      content: `<div style="
        background: #ff5a5a;
        color: white;
        padding: 2px 6px;
        border-radius: 16px;
        font-size: 12px;
        font-weight: bold;
        transform: translateY(-100%);
        white-space: nowrap;
        pointer-events: none;">
        ${safeDevices.length}
      </div>`,
    });

    overlay.setMap(map);

    const infowindow = new window.kakao.maps.InfoWindow({
      content: `<div style="padding:5px;font-size:14px;">${store.name}</div>`,
    });

    window.kakao.maps.event.addListener(marker, 'mouseover', () => {
      infowindow.open(map, marker);
    });
    window.kakao.maps.event.addListener(marker, 'mouseout', () => {
      infowindow.close();
    });

    window.kakao.maps.event.addListener(marker, 'click', async () => {
      console.log(`📦 ${store.name}의 기기 목록:`, safeDevices);

      const center = map.getCenter();
      const lat = center.getLat();
      const lng = center.getLng();

      try {
        const storeDetail = await fetchStoreDetail(store.id, lat, lng);
        console.log(`${store.name}의 상세 정보:`, storeDetail);
      } catch (error) {
        console.error('가맹점 상세정보 요청 실패:', error);
      }
    });
  }
};
