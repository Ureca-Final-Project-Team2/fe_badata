import { fetchStoreDetail, fetchStoreDevices } from '@/features/rental/map/api/apis';
import { createClusterMarker } from '@/features/rental/map/lib/clusterMarker';
import { createDropletMarker } from '@/features/rental/map/lib/dropletMarker';
import { createInfoWindow } from '@/features/rental/map/lib/markerCache';

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

    let totalLeftCount = 0;

    if (zoomLevel >= 4 && isCluster) {
      totalLeftCount = store.leftDeviceCount;
    } else {
      totalLeftCount = store.leftDeviceCount;
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
    }

    // 물방울 마커 클릭 핸들러
    const handleMarkerClick = async () => {
      console.log('🔍 handleMarkerClick 시작:', { storeId: store.id, storeName: store.name });
      if (onStoreMarkerClick) {
        let storeDetail: StoreDetail | undefined = undefined;
        let safeDevices: StoreDevice[] = [];

        try {
          const center = map.getCenter();
          const lat = center.getLat();
          const lng = center.getLng();

          // 클러스터가 아닌 개별 스토어인 경우에만 상세 정보 조회
          if (!store.isCluster && store.id > 0) {
            storeDetail = await fetchStoreDetail(store.id, lat, lng);

            // 줌 레벨 3 이하에서만 디바이스 정보 조회 (개별 마커 클릭 시)
            const currentZoomLevel = map.getLevel();
            if (currentZoomLevel <= 3) {
              // 필터링 조건이 0이면 제거하고 보내기
              const deviceParams: Record<string, string | number | boolean> = {};

              // reviewRating이 0보다 클 때만 추가
              if (filterParams.star && filterParams.star > 0) {
                deviceParams.reviewRating = filterParams.star;
              }

              // price가 0보다 클 때만 추가
              if (filterParams.price && filterParams.price > 0) {
                deviceParams.minPrice = filterParams.price;
                deviceParams.maxPrice = filterParams.price;
              }

              // dataAmount가 있고 유효한 값일 때만 추가
              if (filterParams.dataAmount) {
                // '10GB' 형태의 문자열에서 숫자만 추출
                const numericValue = filterParams.dataAmount.replace(/[^\d]/g, '');
                const dataCapacity = Number(numericValue);
                console.log('🔍 dataAmount 처리:', {
                  original: filterParams.dataAmount,
                  numericValue,
                  dataCapacity,
                  isValid: !isNaN(dataCapacity) && dataCapacity > 0,
                });
                if (!isNaN(dataCapacity) && dataCapacity > 0) {
                  deviceParams.dataCapacity = dataCapacity;
                }
              }

              // dataType이 있을 때만 추가
              if (filterParams.dataType) {
                if (filterParams.dataType === '5G') {
                  deviceParams.is5G = true;
                } else if (filterParams.dataType === '4G/LTE') {
                  deviceParams.is5G = false;
                }
              }

              // maxSupportConnection이 0보다 클 때만 추가
              if (filterParams.maxSupportConnection && filterParams.maxSupportConnection > 0) {
                deviceParams.maxSupportConnection = Number(filterParams.maxSupportConnection);
              }

              // dateRange는 유지 (대여 기간은 서버에서 필터링 필요)
              if (filterParams.dateRange?.from) {
                deviceParams.rentalStartDate = filterParams.dateRange.from
                  .toISOString()
                  .replace(/\.\d{3}Z$/, '');
              }
              if (filterParams.dateRange?.to) {
                deviceParams.rentalEndDate = filterParams.dateRange.to
                  .toISOString()
                  .replace(/\.\d{3}Z$/, '');
              }

              // 디버깅: API 호출 파라미터 로그
              console.log('🔍 디바이스 조회 API 호출:', {
                storeId: store.id,
                storeName: store.name,
                deviceParams,
                filterParams,
              });

              const devices = await fetchStoreDevices(store.id, deviceParams);
              safeDevices = Array.isArray(devices) ? devices : [];

              // 디버깅: API 응답 로그
              console.log('🔍 디바이스 조회 API 응답:', {
                storeId: store.id,
                devicesCount: safeDevices.length,
                devices: safeDevices.map((d) => ({
                  storeDeviceId: d.storeDeviceId,
                  deviceName: d.deviceName,
                  dataCapacity: d.dataCapacity,
                  price: d.price,
                })),
              });
            }
          }
        } catch (error) {
          console.error('상세 정보 조회 실패:', error);
        }

        // DeviceCard 정보를 표시하기 위해 콜백 호출 (디바이스가 없어도 호출)
        console.log('🔍 onStoreMarkerClick 호출:', {
          storeId: store.id,
          devicesCount: safeDevices.length,
          hasStoreDetail: !!storeDetail,
          hasOnStoreMarkerClick: !!onStoreMarkerClick,
        });
        onStoreMarkerClick(safeDevices, storeDetail, store.id);
      } else {
        console.warn('🔍 onStoreMarkerClick이 제공되지 않음');
      }
    };

    // 확장된 마커 상태 확인 (expandedMarkers Set에서 확인)
    const isExpanded = (() => {
      if (typeof window === 'undefined') return false;

      try {
        const expandedMarkers = JSON.parse(localStorage.getItem('expanded-markers') || '[]');
        return Array.isArray(expandedMarkers) && expandedMarkers.includes(store.id);
      } catch (error) {
        console.error('expanded-markers 파싱 오류:', error);
        return false;
      }
    })();

    let marker: kakao.maps.Marker | kakao.maps.CustomOverlay;

    // 줌 레벨에 따라 다른 마커 생성
    if (zoomLevel >= 4) {
      if (!store.isCluster) {
        return null;
      }

      try {
        marker = createClusterMarker(store, map, position, totalLeftCount);
      } catch {
        return null; // 클러스터 마커 생성 실패 시 마커 생성하지 않음
      }
    } else {
      // 줌 레벨 3 이하: 개별 스토어 마커만 생성 (클러스터 제외)
      if (store.isCluster) {
        return null; // 클러스터 데이터는 마커 생성하지 않음
      }

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

    // 이벤트 리스너는 createDropletMarker 내부에서 이미 설정됨
    // setupMarkerEventListeners 호출 제거 (중복 호출 방지)

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
