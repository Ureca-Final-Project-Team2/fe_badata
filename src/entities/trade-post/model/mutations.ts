import { useMutation } from '@tanstack/react-query';

import { deleteTradePostLike, postTradePostLike } from '@/entities/trade-post/api/apis';

export const usePostTradePostLikeMutation = () => {
  return useMutation({
    mutationFn: (postId: number) => postTradePostLike(postId),
  });
};

export const useDeleteTradePostLikeMutation = () => {
  return useMutation({
    mutationFn: (postId: number) => deleteTradePostLike(postId),
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
