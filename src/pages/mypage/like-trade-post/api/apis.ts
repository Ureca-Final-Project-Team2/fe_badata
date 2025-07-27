import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { LikeTradePostContent } from '@/pages/mypage/like-trade-post/lib/types';

export const fetchLikedTradePosts = async (
  cursor?: number,
  size: number = 10,
): Promise<LikeTradePostContent> => {
  return await axiosInstance.get(END_POINTS.MYPAGE.LIKE_TRADE_POST, {
    params: { cursor, size },
  });
}; 