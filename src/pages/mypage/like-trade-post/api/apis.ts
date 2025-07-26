import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { LikeTradePostResponse } from '@/pages/mypage/like-trade-post/lib/types';

export const fetchLikedTradePosts = async (
  cursor?: number,
  size: number = 10,
): Promise<LikeTradePostResponse['content']> => {
  return await axiosInstance.get(END_POINTS.MYPAGE.LIKE_TRADE_POST, {
    params: { cursor, size },
  });
}; 