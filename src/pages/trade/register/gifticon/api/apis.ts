import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { PostTradeGifticonRequest } from '@/pages/trade/register/gifticon/lib/types';

export const postTradeGifticon = async (payload: PostTradeGifticonRequest): Promise<void> => {
  const formData = new FormData();
  formData.append('title', payload.title);
  formData.append('category', payload.category);
  formData.append('partner', payload.partner);
  formData.append('couponNumber', payload.gifticonNumber);
  formData.append('deadLine', payload.deadLine);
  formData.append('issueDate', payload.issueDate);
  formData.append('price', String(payload.price));
  if (payload.comment) {
    formData.append('comment', payload.comment);
  }
  formData.append('file', payload.file);

  await axiosInstance.post(END_POINTS.TRADES.REGISTER_GIFTICON, formData);
};
