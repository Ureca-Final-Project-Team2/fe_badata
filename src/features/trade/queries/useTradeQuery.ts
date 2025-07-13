import { useQuery } from '@tanstack/react-query';
import {
  getTradeDeadlinePosts,
  getTradePostDetail,
  getTradePosts,
} from '@features/trade/apis/trade';
import type { Post } from '@features/trade/models/post';

export const useTradePostsQuery = () => {
  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ['trade-posts'],
    queryFn: getTradePosts,
    gcTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  return { posts, isLoading };
};

export const useTradeDetailQuery = (postId: number) => {
  const { data: post, isLoading } = useQuery<Post>({
    queryKey: ['trade-post', postId],
    queryFn: () => getTradePostDetail(postId),
    gcTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  return { post, isLoading };
};

export const useTradeDeadlineQuery = () => {
  const { data: deadlinePosts, isLoading } = useQuery<Post[]>({
    queryKey: ['deadline-posts'],
    queryFn: getTradeDeadlinePosts,
    gcTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  return { deadlinePosts, isLoading };
};
