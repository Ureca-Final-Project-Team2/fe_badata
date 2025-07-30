import { useQuery } from '@tanstack/react-query';

import { getTradePosts } from '@/entities/trade-post/api/apis';
import { getTradePostDetail } from '@/features/trade/data/detail/api/apis';

import type { DeadlinePost } from '@/entities/trade-post/lib/types';

export const useTradePostsQuery = () => {
  const { data: posts, isLoading } = useQuery<DeadlinePost[]>({
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
