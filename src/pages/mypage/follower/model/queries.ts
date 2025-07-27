import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteFollower, fetchFollowers } from '@/pages/mypage/follower/api/apis';

import type { FollowerItem } from '@/pages/mypage/follower/lib/types';

export function useFollowers(cursor?: number, size: number = 10) {
  const { data, isLoading, isError } = useQuery<{
    item: FollowerItem[];
    nextCursor: number;
    hasNext: boolean;
  }>({
    queryKey: ['followers', cursor, size],
    queryFn: () => fetchFollowers(cursor, size).then(response => response.content),
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

export function useDeleteFollower() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFollower,
    onSuccess: () => {
      // 팔로워 목록 캐시 무효화하여 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ['followers'] });
    },
    onError: (error) => {
      console.error('팔로워 삭제 실패:', error);
    },
  });
} 