import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteTradePost, readTradePosts } from '@/entities/trade-post/api/apis';

import type { AllPost, DeletePostResponse } from '@/entities/trade-post/lib/types';

export const useTradePostsQuery = () => {
  const { data: posts, isLoading } = useQuery<AllPost[]>({
    queryKey: ['trade-posts'],
    queryFn: readTradePosts,
    gcTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  return { posts, isLoading };
};

// 게시물 삭제 mutation
export const useDeleteTradePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<DeletePostResponse, Error, number>({
    mutationFn: (postId: number) => deleteTradePost(postId),
    onSuccess: (data, postId) => {
      // 삭제 성공 시 관련 쿼리들을 무효화하여 UI를 업데이트
      queryClient.invalidateQueries({ queryKey: ['trade-posts'] });
      queryClient.invalidateQueries({ queryKey: ['trade', 'detail', postId] });
      queryClient.invalidateQueries({ queryKey: ['user', 'posts'] });
    },
  });
};
