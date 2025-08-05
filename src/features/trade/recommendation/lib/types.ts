// 추천 게시물
export interface RecommendPost {
  id: number;
  title: string;
  partner: string | null;
  price: number;
  createdAt: string;
  postImage: string;
  postCategory: 'DATA' | 'GIFTICON';
  gifticonCategory: string | null;
  deadLine: string;
  mobileCarrier: 'UPLUS' | 'SKT' | 'KT' | null;
  likesCount: number;
  isLiked: boolean;
  capacity: number | null;
}

export interface RecommendLikeRequest {
  postId: number;
}

export interface RecommendLikeResponse {
  saved: boolean;
}
