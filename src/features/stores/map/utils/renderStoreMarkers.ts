import { Store } from '@features/stores/map/types';
import { fetchStoreDevices } from '@features/stores/map/apis/fetchStoreDevices';
import { formatDateToLocalDateTime } from '@utils/formatDate';

export const renderStoreMarkers = (map: any, stores: Store[]) => {
  if (!map || !window.kakao || stores.length === 0) return;

  stores.forEach((store) => {
    const position = new window.kakao.maps.LatLng(store.latitude, store.longititude);

    const marker = new window.kakao.maps.Marker({
      map,
      position,
    });

    const infowindow = new window.kakao.maps.InfoWindow({
      content: `<div style="padding:5px;font-size:14px;">${store.name}</div>`,
    });

    window.kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
    window.kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());

    window.kakao.maps.event.addListener(marker, 'click', async () => {
      try {
        const now = new Date();
        const rentalStartDate = formatDateToLocalDateTime(now);
        const rentalEndDate = formatDateToLocalDateTime(now);

        const devices = await fetchStoreDevices(store.id, {
          isOpeningNow: false,
          rentalStartDate,
          rentalEndDate,
          reviewRating: 0,
          minPrice: null,
          maxPrice: null,
          dataCapacity: [],
          is5G: false,
          maxSupportConnection: [],
        });

        console.log(`📦 ${store.name}의 기기 목록:`, devices);
      } catch (e) {
        console.error(`❌ ${store.name} 기기 조회 실패:`, e);
      }
    });
  });
};
