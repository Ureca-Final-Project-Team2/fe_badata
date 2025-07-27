import { useQuery } from '@tanstack/react-query';

import { fetchFollowings } from '@/pages/mypage/following/api/apis';

import type { FollowingItem } from '@/pages/mypage/following/lib/types';

export function useFollowings(cursor?: number, size: number = 10) {
  const { data, isLoading, isError } = useQuery<{
    item: FollowingItem[];
    nextCursor: number;
    hasNext: boolean;
  }>({
    queryKey: ['followings', cursor, size],
    queryFn: () => fetchFollowings(cursor, size).then(response => response.content),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return {
    followingItems: data?.item ?? [],
    nextCursor: data?.nextCursor,
    hasNext: data?.hasNext,
    isLoading,
    isError,
  };
} 