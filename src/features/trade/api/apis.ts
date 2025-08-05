import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { DeadlinePost as PostItem } from '@/entities/trade-post/lib/types';
import type { DeadlinePostResponse } from '@/features/trade/deadline/lib/types';

export const getTradeDeadlinePosts = async (cursor?: number): Promise<DeadlinePostResponse> => {
  return await axiosInstance.get(END_POINTS.TRADES.DEADLINE, {
    params: {
      cursor,
      size: 10,
    },
  });
};

export const getTradeTrendingPosts = async (): Promise<PostItem[]> => {
  return await axiosInstance.get(END_POINTS.TRADES.TRENDING);
};
