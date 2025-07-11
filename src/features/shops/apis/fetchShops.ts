import { axiosInstance } from '@shared/lib/axios/axiosInstance';
import { Shop } from '@models/shop';

export const fetchShops = async (): Promise<Shop[]> => {
  return await axiosInstance.get('/api/v1/stores/tmp');
};
