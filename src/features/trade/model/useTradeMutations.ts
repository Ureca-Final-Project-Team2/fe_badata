import { postTradeData, postTradeGifticon } from '@features/trade/api/trade';
import type { PostTradeDataRequest, PostTradeGifticonRequest } from '@features/trade/lib/types';
import { useMutation } from '@tanstack/react-query';

export const usePostTradeDataMutation = () => {
  return useMutation({
    mutationFn: (data: PostTradeDataRequest) => postTradeData(data),
  });
};

export const usePostTradeGifticonMutation = () => {
  return useMutation({
    mutationFn: (data: PostTradeGifticonRequest) => postTradeGifticon(data),
  });
};
