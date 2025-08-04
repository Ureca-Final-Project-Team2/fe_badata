import { fetchStoreDetail, fetchStoreDevices } from '@/features/rental/map/api/apis';
import { createClusterMarker } from '@/features/rental/map/lib/clusterMarker';
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
    const position = new window.kakao.maps.LatLng(store.latitude, store.longititude);

    // 줌 레벨 확인 (클러스터 마커인지 확인)
    const zoomLevel = map.getLevel();
    const isCluster = zoomLevel >= 4 && (store.isCluster || store.leftDeviceCount > 1);

    console.log('🔍 마커 생성:', {
      storeId: store.id,
      storeName: store.name,
      zoomLevel,
      isCluster,
      leftDeviceCount: store.leftDeviceCount,
    });

    let totalLeftCount = 0;

    // 줌 레벨 4 이상(클러스터)인 경우에만 디바이스 정보 조회 생략
    if (zoomLevel >= 4 && isCluster) {
      // 클러스터 마커인 경우 store의 leftDeviceCount 사용
      totalLeftCount = store.leftDeviceCount;
      console.log('🔍 클러스터 - leftDeviceCount 사용:', totalLeftCount);
    } else {
      // 줌 레벨 3 이하인 경우 API 응답의 leftDeviceCount 사용
      totalLeftCount = store.leftDeviceCount;
      console.log('🔍 개별 가맹점 - API 응답 leftDeviceCount 사용:', totalLeftCount);
      // 디바이스 정보는 클릭 시에만 조회하도록 수정
      // 여기서는 디바이스 정보 조회를 하지 않음
    }

    // 로그인 상태 확인 (전역 상태에서 가져오기)
    const isLoggedIn =
      typeof window !== 'undefined' && localStorage.getItem('auth-storage')
        ? JSON.parse(localStorage.getItem('auth-storage') || '{}').state?.isLoggedIn || false
        : false;

    // 좋아요 상태 결정: 로그인한 사용자이고 liked가 true인 경우에만 파란색 표시
    const isLiked = isLoggedIn && store.liked;

    // 마커 캐시 확인
    if (cache && cache.hasMarker(store.id)) {
      // 기존 마커가 있으면 제거 (줌 레벨 변경 시 새로운 마커 생성)
      cache.removeMarker(store.id);
      console.log('🔍 기존 마커 제거됨 (줌 레벨 변경):', store.id);
    }

    // 물방울 마커 클릭 핸들러
    const handleMarkerClick = async () => {
      console.log('🔍 handleMarkerClick 호출됨:', {
        storeId: store.id,
        storeName: store.name,
        isCluster: store.isCluster,
        zoomLevel: map.getLevel(),
      });

      if (onStoreMarkerClick) {
        let storeDetail: StoreDetail | undefined = undefined;
        let safeDevices: StoreDevice[] = [];

        try {
          const center = map.getCenter();
          const lat = center.getLat();
          const lng = center.getLng();

          console.log('🔍 마커 클릭 시 스토어 정보 조회:', {
            storeId: store.id,
            storeName: store.name,
            isCluster: store.isCluster,
            zoomLevel: map.getLevel(),
          });

          // 클러스터가 아닌 개별 스토어인 경우에만 상세 정보 조회
          if (!store.isCluster && store.id > 0) {
            console.log('🔍 개별 스토어 상세 정보 조회 시작:', store.id);
            storeDetail = await fetchStoreDetail(store.id, lat, lng);
            console.log('🔍 개별 스토어 상세 정보 조회 완료:', storeDetail);

            // 줌 레벨 3 이하에서만 디바이스 정보 조회 (개별 마커 클릭 시)
            const currentZoomLevel = map.getLevel();
            if (currentZoomLevel <= 3) {
              console.log('🔍 디바이스 정보 조회 시작:', store.id);
              const deviceParams = {
                ...filterParams,
                maxSupportConnection: filterParams.maxSupportConnection
                  ? [filterParams.maxSupportConnection]
                  : undefined,
              };
              const devices = await fetchStoreDevices(store.id, deviceParams);
              safeDevices = Array.isArray(devices) ? devices : [];
              console.log('🔍 개별 마커 클릭 시 디바이스 정보 조회:', {
                storeId: store.id,
                storeName: store.name,
                deviceCount: safeDevices.length,
                devices: safeDevices,
              });
            }
          } else {
            console.log('🔍 클러스터 마커 클릭 또는 잘못된 storeId:', {
              storeId: store.id,
              isCluster: store.isCluster,
            });
          }
        } catch (error) {
          console.error('상세 정보 조회 실패:', error);
        }

        console.log('🔍 onStoreMarkerClick 콜백 호출:', {
          devices: safeDevices.length,
          storeDetail: !!storeDetail,
          storeId: store.id,
        });

        // DeviceCard 정보를 표시하기 위해 콜백 호출
        onStoreMarkerClick(safeDevices, storeDetail, store.id);
      } else {
        console.warn('🔍 onStoreMarkerClick이 제공되지 않음');
      }
    };

    // 확장된 마커 상태 확인 (expandedMarkers Set에서 확인)
    const isExpanded =
      typeof window !== 'undefined' && localStorage.getItem('expanded-markers')
        ? JSON.parse(localStorage.getItem('expanded-markers') || '[]').includes(store.id)
        : false;

    let marker: kakao.maps.Marker | kakao.maps.CustomOverlay;

    // 줌 레벨에 따라 다른 마커 생성
    if (zoomLevel >= 4) {
      // 클러스터 마커 생성 (줌 레벨 4 이상)
      console.log('🔍 클러스터 마커 생성 - 줌 레벨:', zoomLevel);

      // 클러스터 데이터가 아닌 경우 마커 생성하지 않음
      if (!store.isCluster) {
        console.log('🔍 줌 레벨 4 이상 - 개별 스토어 데이터 무시:', store.id);
        return null;
      }

      try {
        marker = createClusterMarker(store, map, position, totalLeftCount);
      } catch (error) {
        console.log(
          '🔍 클러스터 마커 생성 실패:',
          error instanceof Error ? error.message : 'Unknown error',
        );
        return null; // 클러스터 마커 생성 실패 시 마커 생성하지 않음
      }
    } else {
      // 줌 레벨 3 이하: 개별 스토어 마커만 생성 (클러스터 제외)
      if (store.isCluster) {
        console.log('🔍 줌 레벨 3 이하 - 클러스터 데이터 무시:', store.id);
        return null; // 클러스터 데이터는 마커 생성하지 않음
      }

      console.log('🔍 개별 마커 생성 - 줌 레벨:', zoomLevel);

      // 줌 레벨 3 이하: 물방울 마커 생성 (DeviceCard 표시용)
      console.log('🔍 createDropletMarker 호출:', {
        storeId: store.id,
        storeName: store.name,
        isLiked,
        isExpanded,
        hasHandleMarkerClick: !!handleMarkerClick,
        deviceCount: totalLeftCount,
        handleMarkerClickType: typeof handleMarkerClick,
      });

      marker = createDropletMarker(
        map,
        position,
        store.id,
        isLiked,
        isExpanded, // 확장 상태 사용
        handleMarkerClick,
        totalLeftCount,
        store.name, // 가맹점명 전달
      );
    }

    // 인포윈도우 생성
    const infowindow = createInfoWindow(store.name);

    // 캐시에 마커 추가
    if (cache) {
      cache.addMarker(store.id, {
        marker: marker,
        overlay: null,
        infowindow,
        deviceCount: totalLeftCount,
        isLiked: isLiked,
        isCluster: store.isCluster || false,
        isSelected: isExpanded, // 확장 상태로 설정
        storeName: store.name, // 가맹점명 저장
      });
    }

    // 이벤트 리스너 설정 (개별 마커인 경우에만 - 클러스터 마커는 이미 clusterMarker.ts에서 처리됨)
    if (zoomLevel < 4 && !store.isCluster) {
      setupMarkerEventListeners(
        marker as kakao.maps.CustomOverlay,
        infowindow,
        map,
        store.id,
        false, // isCluster = false
        onStoreMarkerClick,
        [],
      );
    }

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
