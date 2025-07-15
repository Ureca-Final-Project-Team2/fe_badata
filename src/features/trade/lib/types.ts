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
