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

    console.log('🔍 fetchStores 호출 - 파라미터:', params);

    const response = await axiosInstance.get(endpoint, {
      params,
    });

    console.log('🔍 fetchStores 응답:', response);

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

    console.log('🔍 처리된 stores 배열:', stores);

    // API 응답을 Store 타입에 맞게 매핑
    const mappedStores = stores.map((store: Record<string, unknown>) => {
      const isCluster = !store.name; // name이 null이면 클러스터
      const mappedStore = {
        id: Number(store.id) || 0, // 명시적으로 숫자로 변환
        name: (store.name as string) || `클러스터 ${store.id}`, // name이 null인 경우 클러스터 ID로 대체
        latitude: Number(store.latitude) || 0,
        longititude: Number(store.longititude) || 0,
        leftDeviceCount: Number(store.leftDeviceCount) || 0,
        liked: Boolean(store.liked) || false,
        isCluster,
      };

      console.log('🔍 매핑된 store:', mappedStore);

      return mappedStore;
    });

    console.log('🔍 최종 반환 stores:', mappedStores);

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
    // storeId는 클러스터링 ID이므로 실제 API에서는 사용하지 않음
    // 대신 /api/v1/stores/map 엔드포인트를 사용
    console.log('fetchStoreDevices', params);
    const response = await axiosInstance.get(END_POINTS.STORES.ALLDEVICE(), {
      params: {
        ...params,
        // storeId는 클러스터링 ID이므로 제외하고 다른 파라미터들만 전달
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
