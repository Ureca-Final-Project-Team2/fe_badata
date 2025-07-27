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
    staleTime: 0, // 즉시 stale로 처리하여 캐시 무효화 시 바로 새로고침
    refetchOnWindowFocus: true, // 페이지 포커스 시 새로고침
    refetchOnMount: true, // 컴포넌트 마운트 시 새로고침
    refetchOnReconnect: true, // 네트워크 재연결 시 새로고침
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

// 사용자 통계 정보를 가져오는 쿼리
export function useUserStats() {
  const queryClient = useQueryClient();
  
  const { followItems: followersItems, isLoading: isLoadingFollowers } = useFollows(FOLLOW_TYPES.FOLLOWERS, undefined, 100);
  const { followItems: followingsItems, isLoading: isLoadingFollowings } = useFollows(FOLLOW_TYPES.FOLLOWINGS, undefined, 100);

  // 팔로우 삭제 시 통계도 함께 무효화
  const invalidateStats = () => {
    queryClient.invalidateQueries({ queryKey: ['followers'] });
    queryClient.invalidateQueries({ queryKey: ['followings'] });
  };

  return {
    followerCount: followersItems.length,
    followingCount: followingsItems.length,
    isLoading: isLoadingFollowers || isLoadingFollowings,
    invalidateStats,
  };
} 