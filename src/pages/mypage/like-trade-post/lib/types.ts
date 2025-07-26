export interface LikeTradePostItem {
  id: number;
  postId: number;
  postCategory: 'GIFTICON' | 'DATA';
  partner: string;
  title: string;
  price: number;
  postLikes: number;
  postImage: string;
  isSold: boolean;
}

export interface LikeTradePostResponse {
  code: number;
  message: string | null;
  content: {
    item: LikeTradePostItem[];
    nextCursor: number;
    hasNext: boolean;
  };
} 