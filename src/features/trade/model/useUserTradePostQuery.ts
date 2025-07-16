import { Post } from '@features/trade/lib/types';
import { axiosInstance } from '@lib/axios/axiosInstance';
import { useQuery } from '@tanstack/react-query';

interface PostsResponse {
  postsResponse: Post[];
}

interface UserTradePostsResponse {
  soldingPostsResponse: PostsResponse;
  soldedPostsResponse: PostsResponse;
}

export const useUserTradePostsQuery = (userId: number) => {
  return useQuery<UserTradePostsResponse>({
    queryKey: ['user-trade-posts', userId],
    queryFn: async () => {
      const content: UserTradePostsResponse = await axiosInstance.get(
        `/api/v1/trades/posts/${userId}`,
      );
      return content;
    },
    staleTime: 1000 * 60 * 5,
  });
};
