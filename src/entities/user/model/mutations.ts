import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userApis } from '@/entities/user/api/apis';
import { ErrorCode, ErrorMessageMap } from '@/shared/config/errorCodes';
import { makeToast } from '@/shared/lib/makeToast';

import type { FollowToggleResponse } from '@/entities/user/lib/types';
import type { HTTPError } from '@/shared/lib/HTTPError';

export const useCreateFollowMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<FollowToggleResponse, HTTPError, number>({
    mutationFn: (userId: number) => userApis.postFollowToggle(userId),
    onSuccess: (data, userId) => {
      // 팔로우/언팔로우 성공 시 관련 쿼리들을 무효화하여 UI를 업데이트
      queryClient.invalidateQueries({ queryKey: ['user', 'profile', userId] });
      queryClient.invalidateQueries({ queryKey: ['trade', 'seller', userId] });
      queryClient.invalidateQueries({ queryKey: ['user', 'followings'] });
      queryClient.invalidateQueries({ queryKey: ['user', 'all-followings'] });
    },
    onError: () => {
      makeToast(ErrorMessageMap[ErrorCode.FOLLOW_SELF_ERROR], 'warning');
    },
  });
};
