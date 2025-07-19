import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { StoreDevice } from '@/entities/devices/lib/types';
import type { FetchStoresParams } from '@/entities/store/lib/types';
import type { Store } from '@/pages/rental/map/lib/types';
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
  params: Record<string, unknown>,
): Promise<StoreDevice[]> => {
  const response = await axiosInstance.get(END_POINTS.STORES.ALLSTORE(storeId), {
    params,
  });
  return Array.isArray(response) ? response : [];
};

/**
 * 클릭한 가맹점 상세 조회
 */
export const fetchStoreDetail = async (
  storeId: number,
  centerLat: number,
  centerLng: number,
): Promise<StoreDetail> => {
  const response = await axiosInstance.get(END_POINTS.STORES.STOREDETAIL(storeId), {
    params: {
      centerLat,
      centerLng,
    },
  });
  return response;
};
