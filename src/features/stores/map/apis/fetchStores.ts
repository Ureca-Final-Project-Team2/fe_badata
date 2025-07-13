import { axiosInstance } from '@shared/lib/axios/axiosInstance';
import { buildQueryParams } from '@utils/buildQueryParams';
import { FetchStoresParams, Store } from '@features/stores/map/types';

export const fetchStores = async (params: FetchStoresParams): Promise<Store[]> => {
  if (!params || typeof params !== 'object') {
    throw new Error('params가 유효하지 않습니다.');
  }

  const query = buildQueryParams(params);
  return await axiosInstance.get(`/api/v1/stores/map?${query}`);
};
