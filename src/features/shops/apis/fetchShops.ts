import { axiosInstance } from '@/shared/lib/axios/axiosInstance';
import { applyInterceptors } from '@/shared/lib/axios/axiosInterceptor';
import { ApiResponse } from '@/shared/lib/axios/types';
import { Shop } from '@models/shop';

export const fetchShops = async (): Promise<Shop[]> => {
  const shops = await axiosInstance.get<ApiResponse<Shop[]>>('/api/v1/stores/tmp');
  return shops.data.content;
};

applyInterceptors(axiosInstance);
