import { axiosInstance } from '@shared/lib/axios/axiosInstance';
import { buildQueryParams } from '@utils/buildQueryParams';
import { FetchStoresParams, Store } from '@features/stores/map/types';
import { AxiosResponse } from 'axios';
import { ApiResponse } from '@/shared/lib/axios/models';

export const fetchStores = async (
  params: FetchStoresParams,
): Promise<AxiosResponse<ApiResponse<Store[]>>> => {
  const query = buildQueryParams(params);
  return await axiosInstance.get<ApiResponse<Store[]>>(`/api/v1/stores/map?${query}`);
};
