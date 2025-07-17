import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { BasePost } from '@/entities/trade-post/lib/types';

export const getTradeDeadlinePosts = async (): Promise<BasePost[]> => {
  const content: { postsResponse: BasePost[] } = await axiosInstance.get(
    END_POINTS.TRADES.DEADLINE,
  );
  return content.postsResponse ?? [];
};
