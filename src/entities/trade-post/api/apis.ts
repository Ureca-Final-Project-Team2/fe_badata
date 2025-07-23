import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { AllPost } from '@/entities/trade-post/lib/types';

// 게시물 목록 조회
export const readTradePosts = async (): Promise<AllPost[]> => {
  const content: { postsResponse: AllPost[] } = await axiosInstance.get(END_POINTS.TRADES.LIST);
  return content.postsResponse ?? [];
};

// 게시물 삭제
export const deleteTradePost = async (postId: number) => {
  const response = await axiosInstance.delete(END_POINTS.TRADES.DELETE(postId));
  return response.data;
};

// 게시물 수정
export const updateTradePost = async (postId: number, data: { comment: string; price: number }) => {
  const response = await axiosInstance.patch(END_POINTS.TRADES.UPDATE(postId), data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
