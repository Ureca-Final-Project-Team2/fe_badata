import type { AllPost } from '@/entities/trade-post/lib/types';

export type PostType = 'DATA' | 'GIFTICON';

export interface TradeDetailPost {
  id: number;
  title: string;
  comment: string;
  price: number;
  deadLine: string;
  postImage: string;
  isSold: boolean;
  createdAt: string;
  postCategory: PostType;

  // 데이터 거래용
  mobileCarrier?: string;
  capacity?: number;

  // 기프티콘 거래용
  issueDate?: string;
  partner?: string;

  likesCount: number;
  isLiked: boolean;
}

export interface TradeWriter {
  userId: number;
  username: string;
}

export type TradeDetailResponse = {
  user?: { userId: number; username: string };
  seller?: { userId: number; username: string };
  post: TradeDetailPost;
};

export interface PostsResponse {
  postsResponse: AllPost[];
}

export interface UserTradePostsResponse {
  soldingPostsResponse: PostsResponse;
  soldedPostsResponse: PostsResponse;
}
