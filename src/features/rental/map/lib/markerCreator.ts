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

    // 줌 레벨 확인 (클러스터 마커인지 확인)
    const isCluster = store.isCluster || false;

    let safeDevices: StoreDevice[] = [];
    let totalLeftCount = 0;

    // 줌 레벨 4 이상(클러스터)이거나 클러스터 마커인 경우 디바이스 정보 조회 생략
    if (!isCluster) {
      // 디바이스 데이터 조회 (필터 파라미터 전달)
      const deviceParams = {
        ...filterParams,
        maxSupportConnection: filterParams.maxSupportConnection
          ? [filterParams.maxSupportConnection]
          : undefined,
      };
      const devices = await fetchStoreDevices(store.id, deviceParams);
      safeDevices = Array.isArray(devices) ? devices : [];

      // leftCount 총합 계산
      totalLeftCount = safeDevices.reduce((sum, device) => sum + (device.leftCount ?? 0), 0);

      // 디바이스가 0개면 마커 생성하지 않음 (클러스터가 아닌 경우에만)
      if (safeDevices.length === 0 || totalLeftCount === 0) {
        return null;
      }
    } else {
      // 클러스터 마커인 경우 store의 leftDeviceCount 사용
      totalLeftCount = store.leftDeviceCount;
    }

    // 로그인 상태 확인 (전역 상태에서 가져오기)
    const isLoggedIn =
      typeof window !== 'undefined' && localStorage.getItem('auth-storage')
        ? JSON.parse(localStorage.getItem('auth-storage') || '{}').state?.isLoggedIn || false
        : false;

    // 좋아요 상태 결정: 로그인한 사용자이고 liked가 true인 경우에만 like_active 표시
    const shouldShowLikeActive = isLoggedIn && store.liked;

    // 마커 캐시 확인
    if (cache && cache.hasMarker(store.id)) {
      // 기존 마커가 있으면 디바이스 개수와 liked 상태 업데이트
      cache.updateMarker(store.id, totalLeftCount, shouldShowLikeActive, store.isCluster);
      return { storeId: store.id, deviceCount: totalLeftCount };
    }

    // 새 마커 생성 (클러스터든 일반 마커든 좋아요 상태에 따라 아이콘 결정)
    const markerImage = createMarkerImage(shouldShowLikeActive, store.isCluster);
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
        isLiked: shouldShowLikeActive,
        isCluster: store.isCluster || false,
      });
    }

    // 이벤트 리스너 설정 (클러스터가 아닌 경우에만)
    if (!isCluster) {
      setupMarkerEventListeners(marker, map, infowindow, store, safeDevices, onStoreMarkerClick);
    }

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
