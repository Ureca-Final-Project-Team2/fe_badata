import { useQueries } from '@tanstack/react-query';

import { getTradePostDetail } from '@/pages/trade/data/detail/api/apis';


export const useTradeDetailsQuery = (postIds: number[]) => {
  return useQueries({
    queries: postIds.map((postId) => ({
      queryKey: ['tradeDetail', postId],
      queryFn: () => getTradePostDetail(postId),
      enabled: !!postId,
      staleTime: 10 * 60 * 1000, // 10분
    })),
  });
};
