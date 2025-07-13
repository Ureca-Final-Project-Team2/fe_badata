import { axiosInstance } from '@lib/axiosInstance';
import { END_POINTS } from '@constants/api';
import type { Post } from '@features/trade/models/post';

export const getTradePosts = async (): Promise<Post[]> => {
  const content: { postsResponse: Post[] } = await axiosInstance.get(END_POINTS.TRADE.LIST);
  return content.postsResponse ?? [];
};

export const getTradePostDetail = async (postId: number): Promise<Post> => {
  const content: Post = await axiosInstance.get(END_POINTS.TRADE.DETAIL(postId));
  return content;
};

export const getTradeDeadlinePosts = async (): Promise<Post[]> => {
  const content: { postsResponse: Post[] } = await axiosInstance.get(END_POINTS.TRADE.DEADLINE);
  return content.postsResponse ?? [];
};
