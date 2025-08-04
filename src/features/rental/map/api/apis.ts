import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type {
  FetchStoreDevicesParams,
  FetchStoresParams,
  Store,
  StoreDetail,
  StoreDevice,
  StoreListParams,
  StoreListResponse,
} from '@/features/rental/map/lib/types';

/**
 * 전체 가맹점 위치 목록 조회 (조건 필터 포함)
 */
export const fetchStores = async (params: FetchStoresParams): Promise<Store[]> => {
  try {
    const endpoint = END_POINTS.STORES.ALLDEVICE();
    const response = await axiosInstance.get(endpoint, {
      params,
    });
    // API 응답 구조 확인 및 처리
    let stores: Record<string, unknown>[] = [];

    if (response && typeof response === 'object') {
      // response가 객체인 경우 (MapStoresResponse 구조)
      if ('content' in response && Array.isArray(response.content)) {
        stores = response.content as Record<string, unknown>[];
      } else if (Array.isArray(response)) {
        // response 자체가 배열인 경우 (이전 버전 호환성)
        stores = response as Record<string, unknown>[];
      }
    }
    // API 응답을 Store 타입에 맞게 매핑
    const mappedStores = stores.map((store: Record<string, unknown>) => {
      const isCluster = !store.name; // name이 null이면 클러스터
      const mappedStore = {
        id: Number(store.id) || 0,
        name: (store.name as string) || (isCluster ? `클러스터 ${store.id}` : `스토어 ${store.id}`),
        latitude: Number(store.latitude) || 0,
        longititude: Number(store.longititude) || 0,
        leftDeviceCount: Number(store.leftDeviceCount) || 0,
        liked: Boolean(store.liked) || false,
        isCluster,
      };
      return mappedStore;
    });

    // 줌 레벨에 따른 데이터 필터링
    const zoomLevel = params.zoomLevel;
    if (zoomLevel && zoomLevel <= 3) {
      // 줌 레벨 3 이하에서는 클러스터 데이터를 완전히 제거
      const filteredStores = mappedStores.filter((store) => !store.isCluster);
      console.log('🔍 줌 레벨 3 이하 - 클러스터 데이터 필터링:', {
        total: mappedStores.length,
        filtered: filteredStores.length,
        clusters: mappedStores.filter((s) => s.isCluster).length,
        zoomLevel,
      });
      return filteredStores;
    } else if (zoomLevel && zoomLevel >= 4) {
      // 줌 레벨 4 이상에서는 개별 스토어 데이터를 제거하고 클러스터만 표시
      const filteredStores = mappedStores.filter((store) => store.isCluster);
      console.log('🔍 줌 레벨 4 이상 - 개별 스토어 데이터 필터링:', {
        total: mappedStores.length,
        filtered: filteredStores.length,
        individual: mappedStores.filter((s) => !s.isCluster).length,
        zoomLevel,
      });
      return filteredStores;
    }

    return mappedStores;
  } catch (error) {
    console.error('❌ fetchStores API 호출 실패:', error);
    return [];
  }
};

/**
 * 특정 가맹점(storeId)의 장비 목록 조회
 */
export const fetchStoreDevices = async (
  storeId: number,
  params: FetchStoreDevicesParams,
): Promise<StoreDevice[]> => {
  try {
    // 개별 스토어의 디바이스를 조회할 때는 STORES.ALLSTORE 엔드포인트 사용
    const response = await axiosInstance.get(END_POINTS.STORES.ALLSTORE(storeId), {
      params: {
        ...params,
        // storeId는 URL 경로에 포함되므로 params에서 제외
      },
    });

    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error(`스토어 ${storeId} 디바이스 조회 실패:`, error);
    return []; // 에러 발생 시 빈 배열 반환하여 마커는 정상 생성
  }
};

/**
 * 클릭한 가맹점 상세 조회
 */
export const fetchStoreDetail = async (
  storeId: number,
  centerLat: number,
  centerLng: number,
): Promise<StoreDetail> => {
  return await axiosInstance.get(END_POINTS.STORES.STOREDETAIL(storeId), {
    params: {
      centerLat,
      centerLng,
    },
  });
};

/**
 * 가맹점 리스트(무한 스크롤) 조회
 */
export const fetchStoreList = async (params: StoreListParams): Promise<StoreListResponse> => {
  // sort 배열을 문자열로 변환하여 쿼리 파라미터에서 [] 표기 제거
  const { sort, ...otherParams } = params;
  const sortString = Array.isArray(sort) ? sort.join(',') : sort;

  const response: StoreListResponse = await axiosInstance.get(END_POINTS.STORES.STORELIST, {
    params: {
      ...otherParams,
      sort: sortString,
    },
  });
  return response;
};

/**
 * 가맹점 좋아요/좋아요 취소 토글
 */
export const toggleStoreLike = async (
  storeId: number,
  isLiked: boolean,
  signal?: AbortSignal,
): Promise<boolean> => {
  try {
    await axiosInstance.post(
      END_POINTS.STORES.LIKESTORE(storeId),
      {},
      {
        signal,
      },
    );
    return !isLiked; // 토글된 상태 반환
  } catch (error) {
    throw error;
  }
};
