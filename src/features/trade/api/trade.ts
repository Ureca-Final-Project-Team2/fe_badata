import { END_POINTS } from '@constants/api';
import type {
  Post,
  PostTradeDataRequest,
  PostTradeGifticonRequest,
  TradeDetailPost,
} from '@features/trade/lib/types';

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

export const getSearchTradePosts = async (keyword: string): Promise<Post[]> => {
  if (!keyword || keyword.trim() === '') {
    return [];
  }
  const content: { postsResponse: Post[] } = await axiosInstance.get(END_POINTS.TRADES.SEARCH(keyword));
  return content.postsResponse ?? [];
}

export const postTradeData = async (payload: PostTradeDataRequest): Promise<void> => {
  await axiosInstance.post(END_POINTS.TRADES.REGISTER_DATA, payload);
};

export const postTradeGifticon = async (payload: PostTradeGifticonRequest): Promise<void> => {
  await axiosInstance.post(END_POINTS.TRADES.REGISTER_GIFTICON, payload);
};
