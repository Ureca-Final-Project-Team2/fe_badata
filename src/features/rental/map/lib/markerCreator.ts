import { fetchStoreDevices } from '@/features/rental/map/api/apis';
import { createDropletMarker } from '@/features/rental/map/lib/dropletMarker';
import { createInfoWindow } from '@/features/rental/map/lib/markerCache';
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
    console.log('📍 마커 생성 시작:', store.name, store.id);

    const position = new window.kakao.maps.LatLng(store.latitude, store.longititude);

    // 줌 레벨 확인 (클러스터 마커인지 확인)
    const isCluster = store.isCluster || false;
    console.log('📍 클러스터 여부:', isCluster);

    let safeDevices: StoreDevice[] = [];
    let totalLeftCount = 0;

    // 줌 레벨 4 이상(클러스터)이거나 클러스터 마커인 경우 디바이스 정보 조회 생략
    if (!isCluster) {
      console.log('📍 디바이스 정보 조회 시작');
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
      console.log('📍 디바이스 개수:', safeDevices.length, '총 leftCount:', totalLeftCount);
    } else {
      // 클러스터 마커인 경우 store의 leftDeviceCount 사용
      totalLeftCount = store.leftDeviceCount;
      console.log('📍 클러스터 leftDeviceCount:', totalLeftCount);
    }

    // 로그인 상태 확인 (전역 상태에서 가져오기)
    const isLoggedIn =
      typeof window !== 'undefined' && localStorage.getItem('auth-storage')
        ? JSON.parse(localStorage.getItem('auth-storage') || '{}').state?.isLoggedIn || false
        : false;

    // 좋아요 상태 결정: 로그인한 사용자이고 liked가 true인 경우에만 파란색 표시
    const isLiked = isLoggedIn && store.liked;
    console.log(
      '📍 로그인 상태:',
      isLoggedIn,
      '좋아요 상태:',
      store.liked,
      '최종 좋아요:',
      isLiked,
    );

    // 마커 캐시 확인
    if (cache && cache.hasMarker(store.id)) {
      console.log('📍 기존 마커 업데이트:', store.id);
      // 기존 마커가 있으면 디바이스 개수와 liked 상태 업데이트
      cache.updateMarker(store.id, totalLeftCount, isLiked, store.isCluster);
      return { storeId: store.id, deviceCount: totalLeftCount };
    }

    console.log('📍 새 마커 생성:', store.id, '위치:', position.getLat(), position.getLng());

    // 물방울 마커 클릭 핸들러
    const handleMarkerClick = () => {
      if (onStoreMarkerClick && !isCluster) {
        onStoreMarkerClick(safeDevices, undefined, store.id);
      }
    };

    // 물방울 마커 생성 (기본 크기는 small, 선택되지 않은 상태)
    const dropletOverlay = createDropletMarker(
      map,
      position,
      store.id,
      isLiked,
      false, // 기본적으로 선택되지 않음
      handleMarkerClick,
      totalLeftCount, // 디바이스 개수 전달
    );

    console.log('📍 물방울 마커 생성 완료:', store.id);

    // 인포윈도우 생성
    const infowindow = createInfoWindow(store.name);

    // 캐시에 마커 추가
    if (cache) {
      cache.addMarker(store.id, {
        marker: dropletOverlay, // CustomOverlay를 marker로 저장
        overlay: null, // 기존 overlay는 사용하지 않음
        infowindow,
        deviceCount: totalLeftCount,
        isLiked: isLiked,
        isCluster: store.isCluster || false,
      });
      console.log('📍 마커 캐시에 추가 완료:', store.id);
    }

    // 이벤트 리스너 설정
    setupMarkerEventListeners(
      dropletOverlay,
      infowindow,
      map,
      store.id,
      isCluster,
      onStoreMarkerClick,
      safeDevices,
    );

    console.log('📍 마커 생성 완료:', store.id, '디바이스 개수:', totalLeftCount);
    return { storeId: store.id, deviceCount: totalLeftCount };
  } catch (error) {
    console.error('마커 생성 중 오류 발생:', error);
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
