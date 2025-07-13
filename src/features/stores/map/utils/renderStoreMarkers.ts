import { Store } from '@features/stores/map/types';
import { fetchStoreDevices } from '@features/stores/map/apis/fetchStoreDevices';
import { formatDateToLocalDateTime } from '@utils/formatDate';

export const renderStoreMarkers = async (map: any, stores: Store[]) => {
  if (!map || !window.kakao || stores.length === 0) return;

  const now = new Date();
  const rentalStartDate = formatDateToLocalDateTime(now);
  const rentalEndDate = formatDateToLocalDateTime(now);

  for (const store of stores) {
    const position = new window.kakao.maps.LatLng(store.latitude, store.longititude);

    // 사전 기기 목록 조회
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

    // 마커 생성
    const marker = new window.kakao.maps.Marker({ map, position });

    // 숫자 오버레이 생성 (처음부터 표시)
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
  pointer-events: none; /* ✅ 클릭 이벤트 통과 */
">${devices.length}</div>`,
    });

    overlay.setMap(map);

    // 인포윈도우
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
