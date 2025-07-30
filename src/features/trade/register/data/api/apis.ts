import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { PostTradeDataRequest } from '@/features/trade/register/data/lib/types';

export const postTradeData = async (payload: PostTradeDataRequest): Promise<void> => {
  await axiosInstance.post(END_POINTS.TRADES.REGISTER_DATA, payload);
};
