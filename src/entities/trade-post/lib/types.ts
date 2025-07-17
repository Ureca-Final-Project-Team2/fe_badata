export interface AllPost {
  id: number;
  title: string;
  price: number;
  createdAt: string;
  postImage: string;
  postCategory: 'DATA' | 'GIFTICON';
  partner: string | null;
  gifticonCategory: string | null;
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
