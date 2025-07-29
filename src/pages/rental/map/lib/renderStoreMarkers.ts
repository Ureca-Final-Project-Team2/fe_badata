import { fetchStoreDetail, fetchStoreDevices } from '@/pages/rental/map/api/apis';
import { ICONS } from '@/shared/config/iconPath';

import type { Store, StoreDetail, StoreDevice } from '@/pages/rental/map/lib/types';
import type { RentalFilterState } from '@/pages/rental/map/model/rentalFilterReducer';

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

// 사용자 현재 위치 마커 생성 함수 (현재는 useKakaoMapHooks에서 관리하므로 사용하지 않음)
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

// 단일 스토어 마커 생성 함수
const createStoreMarker = async (
  store: Store,
  map: kakao.maps.Map,
  filterParams: RentalFilterState,
  onStoreMarkerClick?: (
    devices: StoreDevice[],
    storeDetail?: StoreDetail,
    storeId?: number,
  ) => void,
): Promise<void> => {
  try {
    // 오타 수정!
    const position = new window.kakao.maps.LatLng(store.latitude, store.longititude);

    // 디바이스 데이터 조회 (필터 파라미터 전달)
    const deviceParams = {
      ...filterParams,
      maxSupportConnection: filterParams.maxSupportConnection
        ? [filterParams.maxSupportConnection]
        : undefined,
    };
    const devices = await fetchStoreDevices(store.id, deviceParams);
    const safeDevices = Array.isArray(devices) ? devices : [];

    // leftCount 총합 계산
    const totalLeftCount = safeDevices.reduce((sum, device) => sum + (device.leftCount ?? 0), 0);

    // 디바이스가 0개면 마커 생성하지 않음, 1개 이상이면 항상 마커 생성
    if (safeDevices.length === 0 || totalLeftCount === 0) {
      // 마커가 이미 생성되어 있다면 제거(중복 방지, 필요시 구현)
      return;
    }

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

    // 생성된 마커와 오버레이를 맵에 추가
    addMarkerToMap(map, marker);
    addMarkerToMap(map, overlay);

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
  filterParams: RentalFilterState,
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
    await Promise.all(
      batch.map((store) => createStoreMarker(store, map, filterParams, onStoreMarkerClick)),
    );

    // 배치 간 약간의 지연을 두어 브라우저 리소스 회복 시간 제공
    if (i + batchSize < stores.length) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
};

// 맵 인스턴스별로 마커를 관리하는 WeakMap
const markersMap = new WeakMap<
  kakao.maps.Map,
  Array<kakao.maps.Marker | kakao.maps.CustomOverlay>
>();

// 특정 맵의 기존 마커들을 모두 제거하는 함수
const clearAllMarkers = (map: kakao.maps.Map): void => {
  const markers = markersMap.get(map) || [];
  markers.forEach((marker) => {
    if (marker instanceof window.kakao.maps.Marker) {
      marker.setMap(null);
    } else if (marker instanceof window.kakao.maps.CustomOverlay) {
      marker.setMap(null);
    }
  });
  markersMap.set(map, []);
};

// 특정 맵에 마커를 추가하는 함수
const addMarkerToMap = (
  map: kakao.maps.Map,
  marker: kakao.maps.Marker | kakao.maps.CustomOverlay,
): void => {
  const markers = markersMap.get(map) || [];
  markers.push(marker);
  markersMap.set(map, markers);
};

export const renderStoreMarkers = async (
  map: kakao.maps.Map,
  stores: Store[],
  filterParams: RentalFilterState,
  onStoreMarkerClick?: (
    devices: StoreDevice[],
    storeDetail?: StoreDetail,
    storeId?: number,
  ) => void,
): Promise<void> => {
  if (!map || !window.kakao) {
    return;
  }

  try {
    // 기존 마커들을 모두 제거
    clearAllMarkers(map);

    // 매장이 있을 때만 마커 렌더링 (현재 위치 마커는 useKakaoMapHooks에서 한 번만 생성)
    if (stores && stores.length > 0) {
      await processBatch(stores, map, filterParams, 5, onStoreMarkerClick);
    }
  } catch (error) {
    console.error('마커 렌더링 중 오류 발생:', error);
  }
};
