import { axiosInstance } from '@shared/lib/axios/axiosInstance';
import { buildQueryParams } from '@utils/buildQueryParams';
import { ApiResponse } from '@shared/lib/axios/types';
import { FetchStoreDevicesParams, StoreDevice } from '@features/stores/map/types';

import type { AxiosResponse } from 'axios';

export const fetchStoreDevices = async (
  storeId: number,
  params: FetchStoreDevicesParams,
): Promise<AxiosResponse<ApiResponse<StoreDevice[]>>> => {
  const query = buildQueryParams(params);
  return await axiosInstance.get<ApiResponse<StoreDevice[]>>(
    `/api/v1/stores/${storeId}/devices?${query}`,
  );
};
