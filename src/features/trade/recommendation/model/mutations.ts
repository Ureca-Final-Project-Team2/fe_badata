import { useMutation } from '@tanstack/react-query';

import {
  patchRecommendVectorUpdate,
  postRecommendLike,
} from '@/features/trade/recommendation/api/apis';
import { queryClient } from '@/shared/lib/queryClient';

// 추천 게시물 좋아요
export const usePostRecommendLikeMutation = () => {
  return useMutation({
    mutationFn: postRecommendLike,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['recommendPosts'],
      });
    },
  });
};

export const usePatchRecommendVectorMutation = () => {
  return useMutation({
    mutationFn: patchRecommendVectorUpdate,
  });
};
