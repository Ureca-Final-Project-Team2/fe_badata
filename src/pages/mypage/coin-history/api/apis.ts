import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { CoinHistoryParams, CoinHistoryResponse, UserCoin } from '@/pages/mypage/coin-history/lib/types';

export const getUserCoin = async (): Promise<UserCoin> => {
  const data: UserCoin = await axiosInstance.get(END_POINTS.MYPAGE.COIN);
  return data;
};

export const getUserCoinHistory = async (params?: CoinHistoryParams): Promise<CoinHistoryResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.cursor) queryParams.append('cursor', params.cursor.toString());
  if (params?.size) queryParams.append('size', params.size.toString());
  
  const url = `${END_POINTS.MYPAGE.COIN_HISTORY}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const data: CoinHistoryResponse = await axiosInstance.get(url);
  return data;
};
