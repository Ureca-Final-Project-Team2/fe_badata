import { useMutation, useQuery, useQueryClient, type QueryClient } from '@tanstack/react-query';

import { deleteFollow, fetchFollows } from '../api/apis';
import { FOLLOW_TYPES } from '../lib/types';

import type { FollowItem, FollowType } from '../lib/types';

// 상수 정의
const DEFAULT_PAGE_SIZE = 10;
const STATS_PAGE_SIZE = 100;

// 캐시 무효화 유틸리티 함수
const invalidateFollowQueries = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: ['followers'], exact: false });
  queryClient.invalidateQueries({ queryKey: ['followings'], exact: false });
};

export function useFollows(followType: FollowType, cursor?: number, size: number = DEFAULT_PAGE_SIZE) {
  const { data, isLoading, isError } = useQuery<{
    item: FollowItem[];
    nextCursor: number;
    hasNext: boolean;
  }>({
    queryKey: [followType === FOLLOW_TYPES.FOLLOWERS ? 'followers' : 'followings', cursor, size],
    queryFn: () => fetchFollows(followType, cursor, size).then((response) => response.content),
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  return {
    followItems: data?.item ?? [],
    nextCursor: data?.nextCursor,
    hasNext: data?.hasNext,
    isLoading,
    isError,
  };
}

export function useDeleteFollow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFollow,
    onSuccess: () => {
      invalidateFollowQueries(queryClient);
    },
    onError: (error) => {
      console.error('팔로우 삭제 실패:', error);
    },
  });
}

export function useUserStats() {
  const queryClient = useQueryClient();
  
  const { followItems: followersItems, isLoading: isLoadingFollowers } = useFollows(FOLLOW_TYPES.FOLLOWERS, undefined, STATS_PAGE_SIZE);
  const { followItems: followingsItems, isLoading: isLoadingFollowings } = useFollows(FOLLOW_TYPES.FOLLOWINGS, undefined, STATS_PAGE_SIZE);

  const invalidateStats = () => {
    invalidateFollowQueries(queryClient);
  };

  return {
    followerCount: followersItems.length,
    followingCount: followingsItems.length,
    isLoading: isLoadingFollowers || isLoadingFollowings,
    invalidateStats,
  };
} 