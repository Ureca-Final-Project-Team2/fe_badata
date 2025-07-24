import { useState } from 'react';

import {
  useDeleteTradePostLikeMutation,
  usePostTradePostLikeMutation,
} from '@/entities/trade-post/model/mutations';

import type { AllPost } from '@/entities/trade-post/lib/types';

export const useTradePostLikeHooks = () => {
  const [loadingItems, setLoadingItems] = useState<Record<number, boolean>>({});

  const postLikeMutation = usePostTradePostLikeMutation();
  const deleteLikeMutation = useDeleteTradePostLikeMutation();

  const setItemLoading = (postId: number, isLoading: boolean) => {
    setLoadingItems((prev) => ({
      ...prev,
      [postId]: isLoading,
    }));
  };

  const toggleLike = (item: AllPost) => {
    setItemLoading(item.id, true);
    if (item.isLiked) {
      deleteLikeMutation.mutate(item.id, {
        onSettled: () => setItemLoading(item.id, false),
      });
    } else {
      postLikeMutation.mutate(item.id, {
        onSettled: () => setItemLoading(item.id, false),
      });
    }
  };

  const isItemLoading = (postId: number): boolean => {
    return Boolean(loadingItems[postId]);
  };

  return {
    toggleLike,
    isItemLoading,
    isError: postLikeMutation.isError || deleteLikeMutation.isError,
    error: postLikeMutation.error || deleteLikeMutation.error,
  };
};
