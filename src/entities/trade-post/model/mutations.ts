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
  });
};

export const useTradePostLike = (postId: number) => {
  const postLikeMutation = usePostTradePostLikeMutation();
  const deleteLikeMutation = useDeleteTradePostLikeMutation();

  const toggleLike = (currentLikeStatus: boolean) => {
    if (currentLikeStatus) {
      deleteLikeMutation.mutate(postId);
    } else {
      postLikeMutation.mutate(postId);
    }
  };

  return {
    toggleLike,
    postLike: () => postLikeMutation.mutate(postId),
    deleteLike: () => deleteLikeMutation.mutate(postId),
  };
};
