import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { FetchStoreDevicesParams, FetchStoresParams } from '@/entities/store/lib/types';
import type {
  FetchStoreListParams,
  Store,
  StoreDevice,
  StoreListResponse,
} from '@/pages/rental/map/lib/types';
import type { StoreDetail } from '@/pages/rental/store/store-detail/lib/types';

/**
 * 전체 가맹점 위치 목록 조회 (조건 필터 포함)
 */
export const fetchStores = async (params: FetchStoresParams): Promise<Store[]> => {
  try {
    const response = await axiosInstance.get(END_POINTS.STORES.ALLDEVICE(), {
      params,
    });
    // response 자체가 배열인지 확인 (axios interceptor에서 이미 data를 추출)
    const stores = Array.isArray(response) ? response : [];
    return stores;
  } catch (error) {
    console.error('fetchStores API 호출 실패:', error);
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
    const response = await axiosInstance.get(END_POINTS.STORES.ALLSTORE(storeId), {
      params,
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
 * 스토어 목록 조회 (필터링 및 페이지네이션 지원)
 */
export const fetchStoreList = async (params: FetchStoreListParams): Promise<StoreListResponse> => {
  try {
    const response = await axiosInstance.get(END_POINTS.STORES.STORELIST, {
      params: {
        centerLat: params.centerLat,
        centerLng: params.centerLng,
        isOpeningNow: params.isOpeningNow,
        rentalStartDate: params.rentalStartDate,
        rentalEndDate: params.rentalEndDate,
        reviewRating: params.reviewRating,
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
        dataCapacity: params.dataCapacity,
        is5G: params.is5G,
        maxSupportConnection: params.maxSupportConnection,
        page: params.page ?? 0,
        size: params.size ?? 10,
        sort: params.sort ?? ['distance,asc'],
      },
    });

    // axios interceptor가 이미 response.data를 추출했다고 가정
    return response as unknown as StoreListResponse;
  } catch (error) {
    console.error('fetchStoreList API 호출 실패:', error);
    return {
      showStoreResponses: [],
      hasNext: false,
    };
  }
};
