import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type {
  CoinHistoryParams,
  CoinHistoryResponse,
} from '@/features/mypage/coin-history/lib/types';

export const getUserCoin = async (): Promise<{ coin: number }> => {
  const response = await axiosInstance.get(END_POINTS.MYPAGE.COIN_HISTORY);
  const items = response.data.content.item;

  const latestTotalCoin = items?.[0]?.totalCoin ?? 0; // 가장 최근 기록의 totalCoin 사용
  return { coin: latestTotalCoin };
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
    throw error;
  }
};
