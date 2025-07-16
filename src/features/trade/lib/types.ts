export interface Post {
  id: number;
  title: string;
  partner?: string;
  price: number;
  createdAt: string;
  postImage: string;
  postCategory: 'DATA' | 'GIFTICON';
  gifticonCategory?: string | null;
  likesCount: number;
  isLiked: boolean;
}

export interface BasePost {
  id: number;
  title: string;
  comment: string;
  price: number;
  createdAt: string;
  postImage: string;
  likesCount: number;
  isLiked: boolean;
  isSold: boolean;
  deadLine: string;
}

export interface DataPost extends BasePost {
  postCategory: 'DATA';
  mobileCarrier?: string;
  capacity?: number;
}

export interface CouponPost extends BasePost {
  postCategory: 'GIFTICON';
  partner?: string;
  issueDate?: string;
  gifticonCategory?: string | null;
}

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

export type PostType = 'DATA' | 'GIFTICON';

export type GifticonCategory =
  | 'OTT/뮤직'
  | '도서/아티클'
  | '자기개발'
  | '식품'
  | '생활/편의'
  | '패션/뷰티'
  | '키즈'
  | '반려동물';

export type MobileCarrier = 'LGU+';

export interface PostTradeDataRequest {
  title: string;
  mobileCarrier: MobileCarrier;
  deadLine: string;
  capacity: number;
  price: number;
  comment: string;
  file: string;
}

export interface PostTradeGifticonRequest {
  title: string;
  category: GifticonCategory;
  partner: string;
  couponNumber: string;
  deadLine: string;
  issueDate: string;
  price: number;
  comment: string;
  file: string | null;
}
