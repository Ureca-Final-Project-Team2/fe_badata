import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { userApis } from '../api/apis';

import type { FollowResponse } from '../lib/types';

// 팔로우 상태 조회 훅
export const useFollowStatusQuery = (userId: number) => {
  return useQuery<FollowResponse>({
    queryKey: ['user', 'follow-status', userId],
    queryFn: () => userApis.readFollowStatus(userId),
    enabled: !!userId, // userId가 있을 때만 실행
    staleTime: 5 * 60 * 1000, // 5분간 캐시
  });
};

export const useCreateFollowMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<FollowResponse, Error, number>({
    mutationFn: (userId: number) => userApis.createFollow(userId),
    onSuccess: (data, userId) => {
      // 팔로우/언팔로우 성공 시 관련 쿼리들을 무효화하여 UI를 업데이트
      queryClient.invalidateQueries({ queryKey: ['user', 'profile', userId] });
      queryClient.invalidateQueries({ queryKey: ['trade', 'seller', userId] });
      queryClient.invalidateQueries({ queryKey: ['user', 'follow-status', userId] });
    },
  });
};
