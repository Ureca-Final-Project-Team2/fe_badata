import { axiosInstance } from '@lib/axiosInstance';
import { END_POINTS } from '@constants/api';
import type { Post } from '@features/trade/models/post';

export const getTradePosts = async (): Promise<Post[]> => {
  const content: { postsResponse: Post[] } = await axiosInstance.get(END_POINTS.TRADES.LIST);
  return content.postsResponse ?? [];
};

export const getTradePostDetail = async (postId: number): Promise<Post> => {
  const content: Post = await axiosInstance.get(END_POINTS.TRADES.DETAIL(postId));
  return content;
};

export const getTradeDeadlinePosts = async (): Promise<Post[]> => {
  const response = await axiosInstance.get(END_POINTS.TRADES.DEADLINE);

  const posts =
    (response as any)?.postsResponse || (response as any)?.data?.content?.postsResponse || [];

  return Array.isArray(posts) ? posts : [];
};
