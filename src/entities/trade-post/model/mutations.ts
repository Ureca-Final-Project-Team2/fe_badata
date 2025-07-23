import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteTradePostLike, postTradePostLike } from '@/entities/trade-post/api/apis';

import type { AllPost } from '@/entities/trade-post/lib/types';

export const usePostTradePostLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => postTradePostLike(postId),
    onMutate: async (postId) => {
      queryClient.setQueryData<AllPost[]>(['trade-posts'], (old) => {
        return old?.map((post) =>
          post.id === postId
            ? { ...post, isLiked: true, likesCount: (post.likesCount || 0) + 1 }
            : post,
        );
      });
    },
    onError: (error, postId) => {
      queryClient.setQueryData<AllPost[]>(['trade-posts'], (old) => {
        return old?.map((post) =>
          post.id === postId
            ? { ...post, isLiked: false, likesCount: Math.max(0, post.likesCount - 1) }
            : post,
        );
      });
      console.error('좋아요 처리 실패', error);
    },
  });
};

export const useDeleteTradePostLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => deleteTradePostLike(postId),
    onMutate: async (postId) => {
      queryClient.setQueryData<AllPost[]>(['trade-posts'], (old) => {
        return old?.map((post) =>
          post.id === postId
            ? { ...post, isLiked: false, likesCount: Math.max(0, post.likesCount || 1) - 1 }
            : post,
        );
      });
    },
    onError: (error, postId) => {
      queryClient.setQueryData<AllPost[]>(['trade-posts'], (old) => {
        return old?.map((post) =>
          post.id === postId ? { ...post, isLiked: true, likesCount: post.likesCount + 1 } : post,
        );
      });
      console.error('좋아요 취소 실패', error);
    },
  });
};
