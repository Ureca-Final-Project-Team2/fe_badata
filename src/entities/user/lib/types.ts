export interface FollowingsContent {
  item: Array<{
    id: number;
    userId: number;
    nickname: string;
    profileImageUrl: string;
  }>;
  nextCursor: number;
  hasNext: boolean;
}

export interface SalesItem {
  postId: number;
  postCategory: string;
  partner: string | null;
  title: string;
  price: number;
  postLikes: number;
  postImage: string | null;
  isSold: boolean;
}

export interface SalesContent {
  item: SalesItem[];
  nextCursor: number;
  hasNext: boolean;
}

export interface UserProfile {
  id: number;
  name: string;
  avatarSrc?: string;
  tradeCount: number;
  isFollowing: boolean;
}

export interface PurchaseItem {
  id: number;
  postId: number;
  postCategory: 'DATA' | 'GIFTICON';
  partner: string;
  title: string;
  price: number;
  postLikes: number;
  postImage: string;
  isSold: boolean;
}

export interface PurchaseResponse {
  item: PurchaseItem[];
  nextCursor: number;
  hasNext: boolean;
}

export interface CoinResponse {
  coin: number;
}
