import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type {
  CoinHistoryParams,
  CoinHistoryResponse,
  UserCoin,
} from '@/features/mypage/coin-history/lib/types';

export const getUserCoin = async (): Promise<UserCoin> => {
  try {
    const response = await axiosInstance.get(END_POINTS.MYPAGE.COIN);
    return response.data.content;
  } catch (error) {
    console.error('Failed to fetch user coin:', error);
    throw error;
  }
};

export const getUserCoinHistory = async (
  params?: CoinHistoryParams,
): Promise<CoinHistoryResponse> => {
  try {
    const response = await axiosInstance.get(END_POINTS.MYPAGE.COIN_HISTORY, {
      params: {
        ...(params?.cursor && { cursor: params.cursor }),
        ...(params?.size && { size: params.size }),
      },
    });
    return response.data.content;
  } catch (error) {
    console.error('Failed to fetch coin history:', error);
    throw error;
  }
};
