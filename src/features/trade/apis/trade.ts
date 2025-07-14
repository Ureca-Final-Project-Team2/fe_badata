import { axiosInstance } from '@lib/axios/axiosInstance';
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
  const content: { postsResponse: Post[] } = await axiosInstance.get(END_POINTS.TRADES.DEADLINE);
  return content.postsResponse ?? [];
};
