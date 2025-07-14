import { axiosInstance } from '@lib/axios/axiosInstance';
import { END_POINTS } from '@constants/api';
import { Post, TradeDetailPost, TradeWriter, PostType } from '@features/trade/models/post';

export const getTradePosts = async (): Promise<Post[]> => {
  const content: { postsResponse: Post[] } = await axiosInstance.get(END_POINTS.TRADES.LIST);
  return content.postsResponse ?? [];
};

export const getTradePostDetail = async (
  postId: number | string,
): Promise<{
  postUserId: number;
  sellerName: string;
  post: TradeDetailPost;
}> => {
  const content = (await axiosInstance.get(END_POINTS.TRADES.DETAIL(Number(postId)))) as any;
  const writer = content.user ?? content.seller;
  return {
    postUserId: writer.userId,
    sellerName: writer.username,
    post: content.post as TradeDetailPost,
  };
};

export const getTradeDeadlinePosts = async (): Promise<Post[]> => {
  const content: { postsResponse: Post[] } = await axiosInstance.get(END_POINTS.TRADES.DEADLINE);
  return content.postsResponse ?? [];
};
