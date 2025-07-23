import {
  useDeleteTradePostLikeMutation,
  usePostTradePostLikeMutation,
} from '@/entities/trade-post/model/mutations';

import type { AllPost } from '@/entities/trade-post/lib/types';

export const useTradePostLikeHooks = () => {
  const postLikeMutation = usePostTradePostLikeMutation();
  const deleteLikeMutation = useDeleteTradePostLikeMutation();

  const toggleLike = (item: AllPost) => {
    if (item.isLiked) {
      deleteLikeMutation.mutate(item.id);
    } else {
      postLikeMutation.mutate(item.id);
    }
  };

  return {
    toggleLike,
    isLoading: postLikeMutation.isPending || deleteLikeMutation.isPending,
    isError: postLikeMutation.isError || deleteLikeMutation.isError,
    error: postLikeMutation.error || deleteLikeMutation.error,
  };
};
