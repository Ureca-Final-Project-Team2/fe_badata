import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import {
  useDeleteTradePostLikeMutation,
  usePostTradePostLikeMutation,
} from '@/entities/trade-post/model/mutations';
import { END_POINTS } from '@/shared/api/endpoints';
import { useAuthRequiredRequest } from '@/shared/hooks/useAuthRequiredRequest';

import type { AllPost } from '@/entities/trade-post/lib/types';
import type { TradeDetailResponse } from '@/widgets/trade/post-detail/lib/types';

// 통합된 좋아요 훅 (전체 페이지와 상세페이지 모두에서 사용)
export const useTradePostLikeHooks = () => {
  const [loadingItems, setLoadingItems] = useState<Record<number, boolean>>({});
  const queryClient = useQueryClient();
  const { executeWithAuth } = useAuthRequiredRequest();

  // 전체 페이지용 뮤테이션
  const postLikeMutation = usePostTradePostLikeMutation();
  const deleteLikeMutation = useDeleteTradePostLikeMutation();

  const setItemLoading = (postId: number, isLoading: boolean) => {
    setLoadingItems((prev) => ({
      ...prev,
      [postId]: isLoading,
    }));
  };

  // 모든 관련 캐시 업데이트 함수
  const updateAllCaches = (postId: number, newIsLiked: boolean) => {
    // 전체 페이지 캐시 업데이트
    queryClient.setQueryData(['trade-posts'], (oldData: AllPost[] | undefined) => {
      if (!oldData) return oldData;
      return oldData.map((post: AllPost) =>
        post.id === postId
          ? {
              ...post,
              isLiked: newIsLiked,
              likesCount: newIsLiked ? post.likesCount + 1 : Math.max(0, post.likesCount - 1),
            }
          : post,
      );
    });

    // 상세페이지 캐시 업데이트
    queryClient.setQueryData(
      ['trade', 'detail', postId],
      (oldData: TradeDetailResponse | undefined) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          post: {
            ...oldData.post,
            isLiked: newIsLiked,
            likesCount: newIsLiked
              ? oldData.post.likesCount + 1
              : Math.max(0, oldData.post.likesCount - 1),
          },
        };
      },
    );
  };

  // 전체 페이지용 토글
  const toggleLike = (item: AllPost) => {
    const executeLikeToggle = async () => {
      setItemLoading(item.id, true);

      if (item.isLiked) {
        await deleteLikeMutation.mutateAsync(item.id);
        updateAllCaches(item.id, false);
      } else {
        await postLikeMutation.mutateAsync(item.id);
        updateAllCaches(item.id, true);
      }

      setItemLoading(item.id, false);
    };

    executeWithAuth(executeLikeToggle, END_POINTS.TRADES.LIKE_POST(item.id));
  };

  // 상세페이지용 토글 (단일 게시물)
  const toggleLikeById = (postId: number, currentIsLiked: boolean) => {
    const executeLikeToggle = async () => {
      setItemLoading(postId, true);

      if (currentIsLiked) {
        await deleteLikeMutation.mutateAsync(postId);
        updateAllCaches(postId, false);
      } else {
        await postLikeMutation.mutateAsync(postId);
        updateAllCaches(postId, true);
      }

      setItemLoading(postId, false);
    };

    executeWithAuth(executeLikeToggle, END_POINTS.TRADES.LIKE_POST(postId));
  };

  // 캐시에서 좋아요 상태 가져오기
  const getCachedLikeState = (postId: number, fallbackIsLiked: boolean) => {
    const cachedData = queryClient.getQueryData<AllPost[]>(['trade-posts']);
    if (cachedData) {
      const cachedPost = cachedData.find((post) => post.id === postId);
      if (cachedPost) {
        return cachedPost.isLiked;
      }
    }
    return fallbackIsLiked;
  };

  const isItemLoading = (postId: number): boolean => {
    return Boolean(loadingItems[postId]);
  };

  return {
    // 전체 페이지용
    toggleLike,
    isItemLoading,

    // 상세페이지용
    toggleLikeById,
    getCachedLikeState,

    // 공통
    isError: postLikeMutation.isError || deleteLikeMutation.isError,
    error: postLikeMutation.error || deleteLikeMutation.error,
  };
};
