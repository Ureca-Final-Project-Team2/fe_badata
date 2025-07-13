import { axiosInstance } from '@shared/lib/axios/axiosInstance';
import type { Shop } from '@models/shop';
import { FetchShopsParams } from '@features/shops/types/fetchShopsParams';
import { buildQueryParams } from '@/shared/utils/buildQueryParams';

export const fetchShops = async (params: FetchShopsParams): Promise<Shop[]> => {
  if (!params || typeof params !== 'object') {
    throw new Error('params가 유효하지 않습니다.');
  }

  const query = buildQueryParams(params);
  return await axiosInstance.get(`/api/v1/stores/map?${query}`);
};
