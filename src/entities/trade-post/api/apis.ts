import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { AllPost } from '@/entities/trade-post/lib/types';

// 게시물 목록 조회 (Read)
export const readTradePosts = async (): Promise<AllPost[]> => {
  const content: { postsResponse: AllPost[] } = await axiosInstance.get(END_POINTS.TRADES.LIST);
  return content.postsResponse ?? [];
};

// 게시물 삭제 (Delete)
export const deleteTradePost = async (postId: number) => {
  const response = await axiosInstance.delete(END_POINTS.TRADES.DELETE(postId));
  return response.data;
};
