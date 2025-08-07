import { useMutation } from '@tanstack/react-query';

import {
  patchRecommendVectorUpdate,
  postRecommendLike,
} from '@/features/trade/recommendation/api/apis';
import { ErrorMessageMap } from '@/shared/config/errorCodes';
import { makeToast } from '@/shared/lib/makeToast';
import { queryClient } from '@/shared/lib/queryClient';

import type { RecommendLikeResponse } from '@/features/trade/recommendation/lib/types';
import type { ErrorCode } from '@/shared/config/errorCodes';
import type { HTTPError } from '@/shared/lib/HTTPError';

// 추천 게시물 좋아요
export const usePostRecommendLikeMutation = () => {
  return useMutation<RecommendLikeResponse, Error, number>({
    mutationFn: postRecommendLike,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['recommendPosts'],
      });
    },
    onError: (error: Error) => {
      const httpError = error as HTTPError;
      if (httpError.code && ErrorMessageMap[httpError.code as ErrorCode]) {
        makeToast(ErrorMessageMap[httpError.code as ErrorCode], 'warning');
      } else {
        makeToast('추천 게시물 좋아요에 실패했습니다.', 'warning');
      }
    },
  });
};

export const usePatchRecommendVectorMutation = () => {
  return useMutation({
    mutationFn: patchRecommendVectorUpdate,
  });
};
