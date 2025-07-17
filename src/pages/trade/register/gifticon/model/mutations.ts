import { useMutation } from '@tanstack/react-query';

import { postTradeGifticon } from '@/pages/trade/register/gifticon/api/apis';

import type { PostTradeGifticonRequest } from '@/pages/trade/register/gifticon/lib/types';

export const usePostTradeGifticonMutation = () => {
  return useMutation({
    mutationFn: (data: PostTradeGifticonRequest) => postTradeGifticon(data),
  });
};
