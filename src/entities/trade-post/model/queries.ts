import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteTradePost, getTradePosts, patchTradePost } from '@/entities/trade-post/api/apis';
import { getTradePostDetail } from '@/pages/trade/data/detail/api/apis';

import type {
  AllPost,
  DeletePostResponse,
  UpdatePostRequest,
  UpdatePostResponse,
} from '@/entities/trade-post/lib/types';

export const useTradePostsQuery = () => {
  const { data: posts, isLoading } = useQuery<AllPost[]>({
    queryKey: ['trade-posts'],
    queryFn: getTradePosts,
    gcTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  return { posts, isLoading };
};

export const useTradePostDetailQuery = (postId: number) => {
  const {
    data: postDetail,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['trade', 'detail', postId],
    queryFn: () => getTradePostDetail(postId),
    enabled: !!postId,
    gcTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  return {
    post: postDetail?.post,
    postUserId: postDetail?.postUserId,
    sellerName: postDetail?.sellerName,
    isLoading,
    error,
  };
};

export const useDeleteTradePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<DeletePostResponse, Error, number>({
    mutationFn: deleteTradePost,
    onSuccess: () => {
      // 삭제 성공 시 관련 쿼리들을 무효화
      queryClient.invalidateQueries({ queryKey: ['trade-posts'] });
      queryClient.invalidateQueries({ queryKey: ['trade', 'detail'] });
    },
  });
};

export const useUpdateTradePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdatePostResponse, Error, { postId: number; data: UpdatePostRequest }>({
    mutationFn: ({ postId, data }) => patchTradePost(postId, data),
    onSuccess: (data, { postId }) => {
      // 수정 성공 시 관련 쿼리들을 무효화
      queryClient.invalidateQueries({ queryKey: ['trade-posts'] });
      queryClient.invalidateQueries({ queryKey: ['trade', 'detail', postId] });
    },
  });
};
