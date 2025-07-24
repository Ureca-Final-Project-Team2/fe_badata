import { fetchStoreDetail, fetchStoreDevices } from '@/pages/rental/map/api/apis';
import { ICONS } from '@/shared/config/iconPath';

import type { Store, StoreDevice } from '@/pages/rental/map/lib/types';
import type { StoreDetail } from '@/pages/rental/store/store-detail/lib/types';

// 상수 정의
const MARKER_SIZE = 36;
const OVERLAY_STYLES = `
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
  width: ${MARKER_SIZE}px;
  height: ${MARKER_SIZE}px;
  line-height: ${MARKER_SIZE}px;
`;

// 사용자 현재 위치 마커 생성 함수
export const showCurrentLocation = (map: kakao.maps.Map): void => {
  if (!map || !window.kakao) return;

  // 카카오 지도에서 제공하는 현재 위치 마커 생성
  const currentLocationMarker = new window.kakao.maps.Marker({
    map: map,
    position: map.getCenter(), // 초기 위치는 지도 중심
  });

  // 현재 위치로 이동하는 함수
  const moveToCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const currentPosition = new window.kakao.maps.LatLng(lat, lng);

          // 마커 위치 업데이트
          currentLocationMarker.setPosition(currentPosition);

          // 지도 중심을 현재 위치로 이동
          map.setCenter(currentPosition);
        },
        (error) => {
          console.error('현재 위치를 가져올 수 없습니다:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
      );
    } else {
      console.error('이 브라우저에서는 위치 정보를 지원하지 않습니다.');
    }
  };

  // 초기 로드 시 현재 위치로 이동
  moveToCurrentLocation();
  // 현재 위치 마커 클릭 시 현재 위치로 다시 이동
  window.kakao.maps.event.addListener(currentLocationMarker, 'click', () => {
    moveToCurrentLocation();
  });
};

// 마커 이미지 생성 함수
const createMarkerImage = () => {
  const markerImageSrc =
    typeof ICONS.ETC.LIKE_NONACTIVE === 'string'
      ? ICONS.ETC.LIKE_NONACTIVE
      : ICONS.ETC.LIKE_NONACTIVE.src;

  return new window.kakao.maps.MarkerImage(
    markerImageSrc,
    new window.kakao.maps.Size(MARKER_SIZE, MARKER_SIZE),
  );
};

// 디바이스 개수 오버레이 생성 함수
const createDeviceCountOverlay = (position: kakao.maps.LatLng, deviceCount: number) => {
  return new window.kakao.maps.CustomOverlay({
    position,
    content: `<div style="${OVERLAY_STYLES}">${deviceCount}</div>`,
  });
};

// 인포윈도우 생성 함수
const createInfoWindow = (storeName: string) => {
  return new window.kakao.maps.InfoWindow({
    content: `<div style="padding:5px;font-size:14px;">${storeName}</div>`,
  });
};

// 마커 이벤트 리스너 설정 함수
const setupMarkerEventListeners = (
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
    console.log(`📦 ${store.name}의 기기 목록:`, safeDevices);

    let storeDetail: StoreDetail | undefined = undefined;
    try {
      const center = map.getCenter();
      const lat = center.getLat();
      const lng = center.getLng();
      storeDetail = await fetchStoreDetail(store.id, lat, lng);
    } catch {}
    if (onStoreMarkerClick) onStoreMarkerClick(safeDevices, storeDetail, store.id);
  });
};

// 단일 스토어 마커 생성 함수
const createStoreMarker = async (
  store: Store,
  map: kakao.maps.Map,
  onStoreMarkerClick?: (
    devices: StoreDevice[],
    storeDetail?: StoreDetail,
    storeId?: number,
  ) => void,
): Promise<void> => {
  try {
    // 오타 수정!
    const position = new window.kakao.maps.LatLng(store.latitude, store.longititude);

    // 디바이스 데이터 조회
    const devices = await fetchStoreDevices(store.id, {});
    const safeDevices = Array.isArray(devices) ? devices : [];

    // leftCount 총합 계산
    const totalLeftCount = safeDevices.reduce((sum, device) => sum + (device.leftCount ?? 0), 0);

    // 마커 생성
    const markerImage = createMarkerImage();
    const marker = new window.kakao.maps.Marker({
      map,
      position,
      image: markerImage,
    });

    // 디바이스 개수 오버레이 생성 (leftCount 총합 사용)
    const overlay = createDeviceCountOverlay(position, totalLeftCount);
    overlay.setMap(map);

    // 인포윈도우 생성
    const infowindow = createInfoWindow(store.name);

    // 이벤트 리스너 설정
    setupMarkerEventListeners(marker, map, infowindow, store, safeDevices, onStoreMarkerClick);
  } catch (error) {
    console.error(`스토어 ${store.name} 마커 생성 실패:`, error);
  }
};

// 배치 처리를 위한 유틸리티 함수
const processBatch = async (
  stores: Store[],
  map: kakao.maps.Map,
  batchSize: number = 5,
  onStoreMarkerClick?: (
    devices: StoreDevice[],
    storeDetail?: StoreDetail,
    storeId?: number,
  ) => void,
): Promise<void> => {
  for (let i = 0; i < stores.length; i += batchSize) {
    const batch = stores.slice(i, i + batchSize);

    // 배치 내에서는 병렬 처리, 배치 간에는 순차 처리
    await Promise.all(batch.map((store) => createStoreMarker(store, map, onStoreMarkerClick)));

    // 배치 간 약간의 지연을 두어 브라우저 리소스 회복 시간 제공
    if (i + batchSize < stores.length) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
};

export const renderStoreMarkers = async (
  map: kakao.maps.Map,
  stores: Store[],
  onStoreMarkerClick?: (
    devices: StoreDevice[],
    storeDetail?: StoreDetail,
    storeId?: number,
  ) => void,
): Promise<void> => {
  if (!map || !window.kakao || !stores || stores.length === 0) {
    console.log('마커 렌더링 조건 불충족:', {
      map: !!map,
      kakao: !!window.kakao,
      stores: !!stores,
      storesCount: stores?.length || 0,
    });
    return;
  }

  try {
    // 현재 위치 마커 표시
    showCurrentLocation(map);

    // 배치 처리로 변경하여 브라우저 리소스 부족 방지
    await processBatch(stores, map, 5, onStoreMarkerClick); // 한 번에 5개씩 처리
  } catch (error) {
    console.error('마커 렌더링 중 오류 발생:', error);
  }
};
