import { useQuery } from '@tanstack/react-query';

import { getTradeDeadlinePosts } from '@/pages/trade/api/apis';

import type { DeadlinePost } from '@/entities/trade-post/lib/types';

export const useTradeDeadlineQuery = () => {
  const { data: deadlinePosts, isLoading } = useQuery<DeadlinePost[]>({
    queryKey: ['deadline-posts'],
    queryFn: getTradeDeadlinePosts,
    gcTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  return { deadlinePosts, isLoading };
};
