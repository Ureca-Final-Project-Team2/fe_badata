import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@shared/lib/axiosInstance';

interface PostItem {
  id: number;
  title: string;
  partner: string | null;
  price: number;
  createdAt: string;
  postImage: string;
  postCategory: string;
  gifticonCategory: string | null;
  likesCount: number;
  isLiked: boolean;
}

interface PostsResponse {
  postsResponse: PostItem[];
}

interface UserTradePostsResponse {
  soldingPostsResponse: PostsResponse;
  soldedPostsResponse: PostsResponse;
}

export const useUserTradePostsQuery = (userId: number) => {
  return useQuery<UserTradePostsResponse>({
    queryKey: ['user-trade-posts', userId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/v1/trades/posts/${userId}`);
      console.log('🔍 API 응답:', data);
      console.log('🔍 content:', data.content);
      console.log('🔍 soldingPostsResponse:', data.content?.soldingPostsResponse);
      return data.content;
    },
    staleTime: 1000 * 60 * 5,
  });
};
