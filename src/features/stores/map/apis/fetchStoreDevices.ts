import { axiosInstance } from '@shared/lib/axios/axiosInstance';
import { buildQueryParams } from '@utils/buildQueryParams';
import { ApiResponse } from '@shared/lib/axios/types';
import { FetchStoreDevicesParams, StoreDevice } from '@features/stores/map/types';

export const fetchStoreDevices = async (
  storeId: number,
  params: FetchStoreDevicesParams,
): Promise<StoreDevice[]> => {
  const query = buildQueryParams(params);
  const { data } = await axiosInstance.get<ApiResponse<StoreDevice[]>>(
    `/api/v1/stores/${storeId}/devices?${query}`,
  );
  return data.content;
};
