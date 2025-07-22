export interface AllPost {
  id: number;
  title: string;
  partner?: string;
  price: number;
  createdAt: Date;
  postImage: string;
  postCategory: 'DATA' | 'GIFTICON';
  gifticonCategory?: string;
  likesCount: number;
  isLiked: boolean;
}

export interface DeadlinePost extends AllPost {
  deadLine: Date;
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

export interface GifticonPost extends BasePost {
  postCategory: 'GIFTICON';
  partner?: string;
  issueDate?: string;
  gifticonCategory?: string | null;
}

export interface LikeContent {
  likeId: number;
}
