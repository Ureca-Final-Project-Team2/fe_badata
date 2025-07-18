import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { StoreDevice } from '@/entities/devices/lib/types';
import type { FetchStoreDevicesParams } from '@/entities/store/lib/types';

/**
 * 특정 가맹점(storeId)의 장비 목록 조회
 */
export const fetchStoreDevices = async (
  storeId: number,
  params: FetchStoreDevicesParams,
): Promise<StoreDevice[]> => {
  const { data } = await axiosInstance.get(END_POINTS.STORES.ALLSTORE(storeId), {
    params,
  });
  return data;
};
