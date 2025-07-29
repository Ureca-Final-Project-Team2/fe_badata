import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type {
  CoinHistoryParams,
  CoinHistoryResponse,
  UserCoin,
} from '@/features/mypage/coin-history/lib/types';

export const getUserCoin = async (): Promise<UserCoin> => {
  const data: UserCoin = await axiosInstance.get(END_POINTS.MYPAGE.COIN);
  return data;
};

export const getUserCoinHistory = async (
  params?: CoinHistoryParams,
): Promise<CoinHistoryResponse> => {
  try {
    const data: CoinHistoryResponse = await axiosInstance.get(END_POINTS.MYPAGE.COIN_HISTORY, {
      params: {
        ...(params?.cursor && { cursor: params.cursor }),
        ...(params?.size && { size: params.size }),
      },
    });
    return data;
  } catch (error) {
    console.error('Failed to fetch coin history:', error);
    throw error;
  }
};
