import type { MobileCarrier } from '@/features/trade/register/data/lib/types';

export interface AllPost {
  id: number;
  title: string;
  partner?: string;
  mobileCarrier?: MobileCarrier;
  price: number;
  capacity?: number;
  createdAt: Date;
  postImage: string;
  postCategory: 'DATA' | 'GIFTICON';
  gifticonCategory?: string;
  likesCount: number;
  isLiked: boolean;
}

export interface DeadlinePost extends AllPost {
  deadLine: string;
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
  mobileCarrier?: MobileCarrier;
  capacity?: number;
}

export interface GifticonPost extends BasePost {
  postCategory: 'GIFTICON';
  partner?: string;
  issueDate?: string;
  gifticonCategory?: string | null;
}

export interface DeletePostResponse {
  success: boolean;
  message: string;
}

export interface DataUpdateRequest {
  title: string;
  comment: string;
  price: number;
}

export interface GifticonUpdateRequest {
  comment: string;
  price: number;
}

export interface UpdatePostResponse {
  postId: number;
}

export interface LikeContent {
  likeId: number;
}

export type ReportType =
  | 'FRAUD'
  | 'DUPLICATE_POST'
  | 'RESELLING_HIGH_PRICE'
  | 'ABOVE_MARKET_PRICE'
  | 'FREE_OR_MONEY_REQUEST'
  | 'ETC';

export interface ReportReasons {
  [key: string]: string;
}

export const REPORT_REASONS: ReportReasons = {
  FRAUD: '거래 사기인 것 같아요',
  DUPLICATE_POST: '무지성 중복 게시글인 것 같아요',
  RESELLING_HIGH_PRICE: '나에게 구매 후 비싸게 재판매 하는 것 같아요',
  ABOVE_MARKET_PRICE: '정가보다 비싸요',
  FREE_OR_MONEY_REQUEST: '무료 나눔 및 금전 요구 글이에요',
  ETC: '기타',
};

export interface ReportRequest {
  reportType: ReportType;
  comment: string;
}

export interface ReportResponse {
  reportId: number;
}

export interface SearchTrendsContent {
  trendingTopics: string[];
}
