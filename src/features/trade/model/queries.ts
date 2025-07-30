import { useQuery } from '@tanstack/react-query';

import { getTradeDeadlinePosts, getTradeTrendingPosts } from '@/features/trade/api/apis';

import type { DeadlinePost as PostItem } from '@/entities/trade-post/lib/types';

export const useTradeDeadlineQuery = () => {
  const { data: deadlinePosts, isLoading } = useQuery<PostItem[]>({
    queryKey: ['deadline-posts'],
    queryFn: getTradeDeadlinePosts,
    gcTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  return { deadlinePosts, isLoading };
};

export const useTradeTrendingQuery = () => {
  const { data: trendingPosts, isLoading } = useQuery<PostItem[]>({
    queryKey: ['trending-posts'],
    queryFn: getTradeTrendingPosts,
    gcTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  return { trendingPosts, isLoading };
};
