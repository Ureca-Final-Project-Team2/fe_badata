import { useQuery } from '@tanstack/react-query';

import { getTradePostDetail } from '@/pages/trade/data/detail/api/apis';
import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type {
  TradeDetailPost,
  UserTradePostsResponse,
} from '@/widgets/trade/post-detail/lib/types';

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

export const useUserTradePostsQuery = (userId: number) => {
  return useQuery<UserTradePostsResponse>({
    queryKey: ['user-trade-posts', userId],
    queryFn: async () => {
      const content: UserTradePostsResponse = await axiosInstance.get(
        END_POINTS.TRADES.USER_POST(userId),
      );
      return content;
    },
    staleTime: 1000 * 60 * 5,
  });
};
