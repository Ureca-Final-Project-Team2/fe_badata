import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { TradeDetailPost, TradeDetailResponse } from '@/widgets/trade/post-detail/lib/types';

export const getTradePostDetail = async (
  postId: number | string,
): Promise<{
  postUserId: number;
  sellerName: string;
  post: TradeDetailPost;
}> => {
  const content = await axiosInstance
    .get<TradeDetailResponse>(END_POINTS.TRADES.DETAIL(Number(postId)))
    .then((res) => res.data);
  const writer = content.user ?? content.seller;
  if (!writer) {
    throw new Error('No writer info in trade detail response');
  }
  return {
    postUserId: writer.userId,
    sellerName: writer.username,
    post: content.post,
  };
};
