import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { RecommendLikeResponse, RecommendPost } from '../lib/types';

export const getRecommendPosts = async (): Promise<RecommendPost[]> => {
  const data: { postsResponse: RecommendPost[] } = await axiosInstance.get(
    END_POINTS.TRADES.RECOMMEND,
  );
  return data.postsResponse;
};

export const postRecommendLike = async (postId: number): Promise<RecommendLikeResponse> => {
  const response: RecommendLikeResponse = await axiosInstance.post(
    END_POINTS.TRADES.RECOMMEND_LIKE(postId),
  );
  return response;
};
