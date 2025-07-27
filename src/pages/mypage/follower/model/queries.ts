import { useQuery } from '@tanstack/react-query';

import { fetchFollowers } from '@/pages/mypage/follower/api/apis';

import type { FollowerItem } from '@/pages/mypage/follower/lib/types';

export function useFollowers(cursor?: number, size: number = 10) {
  const { data, isLoading, isError } = useQuery<{
    item: FollowerItem[];
    nextCursor: number;
    hasNext: boolean;
  }>({
    queryKey: ['followers', cursor, size],
    queryFn: () => fetchFollowers(cursor, size),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return {
    followerItems: data?.item ?? [],
    nextCursor: data?.nextCursor,
    hasNext: data?.hasNext,
    isLoading,
    isError,
  };
} 