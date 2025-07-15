import {
  getSearchTradePosts,
  getTradeDeadlinePosts,
  getTradePostDetail,
  getTradePosts,
} from '@features/trade/api/trade';
import type { Post, TradeDetailPost } from '@features/trade/lib/types';
import { useQuery } from '@tanstack/react-query';

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
  const { data, isLoading } = useQuery<{
    postUserId: number;
    sellerName: string;
    post: TradeDetailPost;
  }>({
    queryKey: ['trade-post', postId],
    queryFn: () => getTradePostDetail(postId),
    gcTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  return { ...data, isLoading };
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

const MIN_LOADING_TIME = 400;
export const useSearchTradePostsQuery = (keyword: string) => {
  return useQuery<Post[]>({
    queryKey: ['search-trade-posts', keyword],
    queryFn: async () => {
      const start = Date.now();
      const result = await getSearchTradePosts(keyword);
      const elapsed = Date.now() - start;

      if (elapsed < MIN_LOADING_TIME) {
        await new Promise(res => setTimeout(res, MIN_LOADING_TIME - elapsed));
      }

      return result;
    },
    enabled: !!keyword,
    gcTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });
};