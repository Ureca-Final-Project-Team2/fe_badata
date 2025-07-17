import { useQuery } from '@tanstack/react-query';

import { getTradePosts } from '@/entities/trade-post/api/apis';

import type { AllPost } from '@/entities/trade-post/lib/types';

export const useTradePostsQuery = () => {
  const { data: posts, isLoading } = useQuery<AllPost[]>({
    queryKey: ['trade-posts'],
    queryFn: getTradePosts,
    gcTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  return { posts, isLoading };
};
