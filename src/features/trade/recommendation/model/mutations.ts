import { useMutation } from '@tanstack/react-query';

import {
  patchRecommendVectorUpdate,
  postRecommendLike,
} from '@/features/trade/recommendation/api/apis';
import { queryClient } from '@/shared/lib/queryClient';

import type { RecommendLikeResponse } from '../lib/types';

// 추천 게시물 좋아요
export const usePostRecommendLikeMutation = () => {
  return useMutation<RecommendLikeResponse, Error, number>({
    mutationFn: postRecommendLike,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['recommendPosts'],
      });
    },
    onError: (error) => {
      console.error('추천 게시물 좋아요에 실패했습니다:', error);
    },
  });
};

export const usePatchRecommendVectorMutation = () => {
  return useMutation({
    mutationFn: patchRecommendVectorUpdate,
  });
};
