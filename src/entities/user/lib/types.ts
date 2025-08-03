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
  userId: number;
  name: string;
  profileImage?: string;
}

export interface UserInfoResponse {
  profileImage: string;
  nickName: string;
  days: number;
}

export interface FollowToggleResponse {
  following: boolean;
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

export interface PostCountResponse {
  postCount: number;
}

export interface PurchasedGifticonDetail {
  sellerId: number;
  nickname: string;
  id: number;
  title: string;
  comment: string;
  price: number;
  deadLine: string;
  boughtAt: string | null; // null일 수 있음
  partner: string;
  barcodeViewTime?: string; // 선택적 필드
}

export interface PurchasedGifticonImage {
  postImage: string;
  couponNumber: string;
}

export interface PurchaseReportRequest {
  comment: string;
}

export interface PurchaseReportResponse {
  reportId: number;
}
