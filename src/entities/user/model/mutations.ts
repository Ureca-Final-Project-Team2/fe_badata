import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userApis } from '@/entities/user/api/apis';

import type { ApiResponse } from '@/shared/lib/axios/responseTypes';

export const useCreateFollowMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<unknown>, Error, number>({
    mutationFn: (userId: number) => userApis.postFollowToggle(userId),
    onSuccess: (data, userId) => {
      // 팔로우/언팔로우 성공 시 관련 쿼리들을 무효화하여 UI를 업데이트
      queryClient.invalidateQueries({ queryKey: ['user', 'profile', userId] });
      queryClient.invalidateQueries({ queryKey: ['trade', 'seller', userId] });
      queryClient.invalidateQueries({ queryKey: ['user', 'followings'] });
      queryClient.invalidateQueries({ queryKey: ['user', 'all-followings'] });
    },
  });
};
