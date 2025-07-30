import { fetchStoreDevices } from '@/features/rental/map/api/apis';
import {
  createDeviceCountOverlay,
  createInfoWindow,
  createMarkerImage,
} from '@/features/rental/map/lib/markerCache';
import { setupMarkerEventListeners } from '@/features/rental/map/lib/markerEventHandlers';

import type { MarkerCache } from '@/features/rental/map/lib/markerCache';
import type { Store, StoreDetail, StoreDevice } from '@/features/rental/map/lib/types';
import type { RentalFilterState } from '@/features/rental/map/model/rentalFilterReducer';

// 단일 스토어 마커 생성 함수
export const createStoreMarker = async (
  store: Store,
  map: kakao.maps.Map,
  filterParams: RentalFilterState,
  cache: MarkerCache, // MarkerCache 타입 명시
  onStoreMarkerClick?: (
    devices: StoreDevice[],
    storeDetail?: StoreDetail,
    storeId?: number,
  ) => void,
): Promise<{ storeId: number; deviceCount: number } | null> => {
  try {
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

    // 디바이스가 0개면 마커 생성하지 않음
    if (safeDevices.length === 0 || totalLeftCount === 0) {
      return null;
    }

    // 마커 캐시 확인
    if (cache && cache.hasMarker(store.id)) {
      // 기존 마커가 있으면 디바이스 개수만 업데이트
      cache.updateMarker(store.id, totalLeftCount);
      return { storeId: store.id, deviceCount: totalLeftCount };
    }

    // 새 마커 생성
    const markerImage = createMarkerImage();
    const marker = new window.kakao.maps.Marker({
      map,
      position,
      image: markerImage,
    });

    // 디바이스 개수 오버레이 생성
    const overlay = createDeviceCountOverlay(position, totalLeftCount);
    overlay.setMap(map);

    // 인포윈도우 생성
    const infowindow = createInfoWindow(store.name);

    // 캐시에 마커 추가
    if (cache) {
      cache.addMarker(store.id, {
        marker,
        overlay,
        infowindow,
        deviceCount: totalLeftCount,
      });
    }

    // 이벤트 리스너 설정
    setupMarkerEventListeners(marker, map, infowindow, store, safeDevices, onStoreMarkerClick);

    return { storeId: store.id, deviceCount: totalLeftCount };
  } catch (error) {
    console.error(`스토어 ${store.name} 마커 생성 실패:`, error);
    return null;
  }
};

// 배치 처리를 위한 유틸리티 함수
export const processBatch = async (
  stores: Store[],
  map: kakao.maps.Map,
  filterParams: RentalFilterState,
  cache: MarkerCache,
  batchSize: number = 5,
  onStoreMarkerClick?: (
    devices: StoreDevice[],
    storeDetail?: StoreDetail,
    storeId?: number,
  ) => void,
): Promise<Set<number>> => {
  const createdStoreIds = new Set<number>();

  for (let i = 0; i < stores.length; i += batchSize) {
    const batch = stores.slice(i, i + batchSize);

    // 배치 내에서는 병렬 처리
    const results = await Promise.all(
      batch.map((store) => createStoreMarker(store, map, filterParams, cache, onStoreMarkerClick)),
    );

    // 성공적으로 생성된 마커들의 storeId 수집
    results.forEach((result) => {
      if (result) {
        createdStoreIds.add(result.storeId);
      }
    });

    // 배치 간 약간의 지연
    if (i + batchSize < stores.length) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }

  return createdStoreIds;
};
