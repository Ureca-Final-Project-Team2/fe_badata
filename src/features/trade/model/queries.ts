import { useQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { getTradeDeadlinePosts, getTradeTrendingPosts } from '@/features/trade/api/apis';

import type { DeadlinePost as PostItem } from '@/entities/trade-post/lib/types';
import type { DeadlinePostResponse } from '@/features/trade/deadline/lib/types';

export const useTradeDeadlineQuery = () => {
  return useQuery({
    queryKey: ['deadline-banner-posts'],
    queryFn: () => getTradeDeadlinePosts(),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useTradeDeadlineInfiniteQuery = () => {
  return useSuspenseInfiniteQuery({
    queryKey: ['deadline-posts'],
    queryFn: ({ pageParam }) => getTradeDeadlinePosts(pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage: DeadlinePostResponse) => {
      return lastPage.hasNext ? lastPage.nextCursor : null;
    },
  });
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
