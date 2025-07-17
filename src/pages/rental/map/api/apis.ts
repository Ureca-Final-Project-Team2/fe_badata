import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { FetchStoresParams } from '@/entities/store/lib/types';
import type { Store } from '@/pages/rental/map/lib/types';
import type { StoreDetail } from '@/pages/rental/store/store-detail/lib/types';

/**
 * 전체 가맹점 위치 목록 조회 (조건 필터 포함)
 */
export const fetchStores = async (params: FetchStoresParams): Promise<Store[]> => {
  const { data } = await axiosInstance.get(END_POINTS.STORES.ALLDEVICE(), {
    params,
  });
  return data;
};

/**
 * 클릭한 가맹점 상세 조회
 */
export const fetchStoreDetail = async (
  storeId: number,
  centerLat: number,
  centerLng: number,
): Promise<StoreDetail> => {
  const { data } = await axiosInstance.get(END_POINTS.STORES.STOREDETAIL(storeId), {
    params: {
      centerLat,
      centerLng,
    },
  });
  return data;
};
