import { Store } from '@features/stores/map/types';
import { fetchStoreDevices } from '@features/stores/map/apis/map';

export const renderStoreMarkers = async (map: any, stores: Store[]) => {
  if (!map || !window.kakao || stores.length === 0) return;

  for (const store of stores) {
    const position = new window.kakao.maps.LatLng(store.latitude, store.longititude);

    // 👉 조건 없이 모든 기기 조회
    const devices = await fetchStoreDevices(store.id, {});

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
        ${devices.length}
      </div>`,
    });

    overlay.setMap(map);

    const infowindow = new window.kakao.maps.InfoWindow({
      content: `<div style="padding:5px;font-size:14px;">${store.name}</div>`,
    });

    window.kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
    window.kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close(map, marker));
    window.kakao.maps.event.addListener(marker, 'click', () => {
      console.log(`📦 ${store.name}의 기기 목록:`, devices);
    });
  }
};
