import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userApis } from '@/entities/user/api/apis';

import type { FollowToggleResponse } from '@/entities/user/lib/types';

export const useCreateFollowMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<FollowToggleResponse, Error, number>({
    mutationFn: (userId: number) => userApis.postFollowToggle(userId),
    onSuccess: (data, userId) => {
      console.log('팔로우 토글 성공:', data);
      // 팔로우/언팔로우 성공 시 관련 쿼리들을 무효화하여 UI를 업데이트
      queryClient.invalidateQueries({ queryKey: ['user', 'profile', userId] });
      queryClient.invalidateQueries({ queryKey: ['trade', 'seller', userId] });
      queryClient.invalidateQueries({ queryKey: ['user', 'followings'] });
      queryClient.invalidateQueries({ queryKey: ['user', 'all-followings'] });
    },
    onError: (error) => {
      console.error('팔로우 토글 실패:', error);
    },
  });
};
