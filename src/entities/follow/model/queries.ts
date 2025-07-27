import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteFollow, fetchFollows } from '../api/apis';
import { FOLLOW_TYPES } from '../lib/types';

import type { FollowItem, FollowType } from '../lib/types';

export function useFollows(followType: FollowType, cursor?: number, size: number = 10) {
  const { data, isLoading, isError } = useQuery<{
    item: FollowItem[];
    nextCursor: number;
    hasNext: boolean;
  }>({
    queryKey: [followType === FOLLOW_TYPES.FOLLOWERS ? 'followers' : 'followings', cursor, size],
    queryFn: () => fetchFollows(followType, cursor, size).then(response => response.content),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
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
      // 팔로워/팔로잉 목록 캐시 무효화하여 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ['followers'] });
      queryClient.invalidateQueries({ queryKey: ['followings'] });
    },
    onError: (error) => {
      console.error('팔로우 삭제 실패:', error);
    },
  });
} 