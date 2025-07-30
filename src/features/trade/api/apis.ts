import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { DeadlinePost } from '@/entities/trade-post/lib/types';

export const getTradeDeadlinePosts = async (): Promise<DeadlinePost[]> => {
  const content: { postsResponse: DeadlinePost[] } = await axiosInstance.get(
    END_POINTS.TRADES.DEADLINE,
  );
  return content.postsResponse ?? [];
};
