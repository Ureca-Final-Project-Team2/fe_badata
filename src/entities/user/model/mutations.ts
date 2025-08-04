import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userApis } from '@/entities/user/api/apis';
import { ErrorMessageMap } from '@/shared/config/errorCodes';
import { makeToast } from '@/shared/lib/makeToast';

import type { FollowToggleResponse } from '@/entities/user/lib/types';
import type { ErrorCode } from '@/shared/config/errorCodes';
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
    onError: (error: HTTPError) => {
      const errorCode = error.code as ErrorCode;

      if (errorCode && errorCode in ErrorMessageMap) {
        makeToast(ErrorMessageMap[errorCode], 'warning');
      } else {
        makeToast('팔로우/언팔로우에 실패했습니다.', 'warning');
      }
    },
  });
};
