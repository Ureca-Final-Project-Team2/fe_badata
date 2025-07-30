import { useQuery } from '@tanstack/react-query';

import { fetchLikedTradePosts } from '@/features/mypage/like-trade-post/api/apis';

import type { LikeTradePostContent } from '@/features/mypage/like-trade-post/lib/types';

export function useLikedTradePosts(cursor?: number, size: number = 10) {
  const { data, isLoading, isError } = useQuery<LikeTradePostContent>({
    queryKey: ['likedTradePosts', cursor, size],
    queryFn: () => fetchLikedTradePosts(cursor, size),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return {
    likeTradePostItems: data?.item ?? [],
    nextCursor: data?.nextCursor,
    hasNext: data?.hasNext,
    isLoading,
    isError,
  };
}
