import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { PostTradeGifticonRequest } from '@/pages/trade/register/gifticon/lib/types';

export const postTradeGifticon = async (payload: PostTradeGifticonRequest): Promise<void> => {
  await axiosInstance.post(END_POINTS.TRADES.REGISTER_GIFTICON, payload);
};
