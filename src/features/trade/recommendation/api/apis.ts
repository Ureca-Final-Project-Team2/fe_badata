import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { RecommendLikeResponse, RecommendPost } from '../lib/types';

export const getRecommendPosts = async (isStart: boolean = false): Promise<RecommendPost[]> => {
  const data: { postsResponse: RecommendPost[] } = await axiosInstance.get(
    END_POINTS.TRADES.RECOMMEND,
    {
      params: { isStart },
    },
  );
  return data.postsResponse;
};

export const postRecommendLike = async (postId: number): Promise<RecommendLikeResponse> => {
  const response: RecommendLikeResponse = await axiosInstance.post(
    END_POINTS.TRADES.RECOMMEND_LIKE(postId),
  );
  return response;
};

export const patchRecommendVectorUpdate = async (): Promise<void> => {
  await axiosInstance.patch(END_POINTS.TRADES.RECOMMEND_VECTOR_UPDATE);
};
