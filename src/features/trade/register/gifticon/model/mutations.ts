import { useMutation } from '@tanstack/react-query';

import {
  postTradeGifticon,
  validateGifticonImage,
} from '@/features/trade/register/gifticon/api/apis';

import type {
  PostTradeGifticonRequest,
  ValidationResponse,
} from '@/features/trade/register/gifticon/lib/types';
import type { ApiResponse } from '@/shared/lib/axios/responseTypes';

export const usePostTradeGifticonMutation = () => {
  return useMutation({
    mutationFn: (data: PostTradeGifticonRequest) => postTradeGifticon(data),
  });
};

export const useValidateGifticonImageMutation = () => {
  return useMutation<ApiResponse<ValidationResponse>, Error, File>({
    mutationFn: (file: File) => validateGifticonImage(file),
  });
};
