import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { AllPost, LikeContent } from '@/entities/trade-post/lib/types';

export const getTradePosts = async (): Promise<AllPost[]> => {
  const content: { postsResponse: AllPost[] } = await axiosInstance.get(END_POINTS.TRADES.LIST);
  return content.postsResponse ?? [];
};

export const postTradePostLike = async (postId: number): Promise<LikeContent> => {
  const content: LikeContent = await axiosInstance.post(END_POINTS.TRADES.LIKE_POST(postId));
  return content;
};

export const deleteTradePostLike = async (postId: number): Promise<LikeContent> => {
  const content: LikeContent = await axiosInstance.delete(END_POINTS.TRADES.LIKE_POST(postId));
  return content;
};
