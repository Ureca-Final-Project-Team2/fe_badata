import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { DeadlinePost as PostItem } from '@/entities/trade-post/lib/types';

export const getTradeDeadlinePosts = async (): Promise<PostItem[]> => {
  const content: { item: PostItem[] } = await axiosInstance.get(END_POINTS.TRADES.DEADLINE);
  return content.item ?? [];
};

export const getTradeTrendingPosts = async (): Promise<PostItem[]> => {
  const content: { postsResponse: PostItem[] } = await axiosInstance.get(
    END_POINTS.TRADES.TRENDING,
  );

  return content.postsResponse ?? [];
};
