import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { AllPost } from '@/entities/trade-post/lib/types';

export const getTradeDeadlinePosts = async (): Promise<AllPost[]> => {
  const content: { postsResponse: AllPost[] } = await axiosInstance.get(END_POINTS.TRADES.DEADLINE);
  return content.postsResponse ?? [];
};
