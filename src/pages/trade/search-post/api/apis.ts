import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { BasePost } from '@/entities/trade-post/lib/types';

export const getSearchTradePosts = async (keyword: string): Promise<BasePost[]> => {
  if (!keyword || keyword.trim() === '') {
    return [];
  }
  const content: { postsResponse: BasePost[] } = await axiosInstance.get(
    END_POINTS.TRADES.SEARCH(keyword),
  );
  return content.postsResponse ?? [];
};
