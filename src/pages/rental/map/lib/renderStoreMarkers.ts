import { ICONS } from '@/shared/config/iconPath';

import { fetchStoreDetail, fetchStoreDevices } from '../api/apis';

import type { Store } from './types';

export const renderStoreMarkers = async (map: kakao.maps.Map, stores: Store[]) => {
  if (!map || !window.kakao || !stores || stores.length === 0) {
    console.log('마커 렌더링 조건 불충족:', {
      map: !!map,
      kakao: !!window.kakao,
      stores: !!stores,
      storesCount: stores?.length || 0,
    });
    return;
  }

  for (const store of stores) {
    const position = new window.kakao.maps.LatLng(store.latitude, store.longititude);

    // 마커 이미지로 조개(LIKE_NONACTIVE) 사용
    const markerImageSrc =
      typeof ICONS.ETC.LIKE_NONACTIVE === 'string'
        ? ICONS.ETC.LIKE_NONACTIVE
        : ICONS.ETC.LIKE_NONACTIVE.src;
    const markerImage = new window.kakao.maps.MarkerImage(
      markerImageSrc,
      new window.kakao.maps.Size(36, 36), // 원하는 크기로 조정
    );

    // 👉 조건 없이 모든 기기 조회
    const devices = await fetchStoreDevices(store.id, {});
    const safeDevices = Array.isArray(devices) ? devices : [];

    const marker = new window.kakao.maps.Marker({ map, position, image: markerImage });

    // 디바이스 개수를 조개(마커) 중앙에 검정색으로 표시하는 오버레이
    const overlay = new window.kakao.maps.CustomOverlay({
      position,
      content: `<div style="
        position: absolute;
        left: 50%;
        top: 20%;
        transform: translate(-50%, -95%);
        background: transparent;
        color: black;
        font-size: 16px;
        font-weight: bold;
        pointer-events: none;
        text-align: center;
        width: 36px;
        height: 36px;
        line-height: 36px;">
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
