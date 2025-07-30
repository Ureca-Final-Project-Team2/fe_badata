import { useMutation } from '@tanstack/react-query';

import { postTradeData } from '@/features/trade/register/data/api/apis';

import type { PostTradeDataRequest } from '@/features/trade/register/data/lib/types';

export const usePostTradeDataMutation = () => {
  return useMutation({
    mutationFn: (data: PostTradeDataRequest) => postTradeData(data),
  });
};
