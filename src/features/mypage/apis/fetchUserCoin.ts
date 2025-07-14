import { axiosInstance } from '@/shared/lib/axios/axiosInstance';
import { UserCoin } from '../types/userCoin';

export const fetchUserCoin = async (): Promise<UserCoin> => {
  const response = await axiosInstance.get('/api/v1/users/coin');
  const coinData = response.data ?? response;
  if (!coinData || coinData.coin === undefined) {
    throw new Error('잘못된 응답 형식');
  }

  return coinData;
};
