import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userApis } from '@/entities/user/api/apis';

import type { FollowResponse } from '@/entities/user/lib/types';

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
