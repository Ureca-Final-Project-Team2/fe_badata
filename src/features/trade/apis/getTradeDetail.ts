import { BASE_URL } from '@shared/constants/api';
import { headers } from 'next/headers';

export interface TradeWriter {
  userId: number;
  username: string;
}

export interface TradePost {
  id: number;
  title: string;
  comment: string;
  price: number;
  deadLine: string;
  postImage: string;
  isSold: boolean;
  createdAt: string;

  // 데이터 거래용
  mobileCarrier?: string;
  capacity?: number;

  // 기프티콘 거래용
  issueDate?: string;
  partner?: string;

  likesCount: number;
  isLiked: boolean;
}

export type PostType = 'data' | 'gifticon';

export const getTradeDetail = async (postId: string) => {
  const headerList = await headers();
  const cookie = headerList.get('cookie') ?? '';

  const res = await fetch(`${BASE_URL}/api/v1/trades/${postId}/post`, {
    cache: 'no-store',
    credentials: 'include', // 쿠키 포함
    headers: {
      cookie, // Next.js 서버에서 현재 쿠키 가져오기
    },
  });

  const data = await res.json();

  console.log('Trade Detail API 응답:', data);

  if (!data.content) {
    throw new Error(`게시글 상세 정보를 불러올 수 없습니다. postId: ${postId}`);
  }

  const content = data.content;
  const writer = content.user ?? content.seller;

  return {
    postUserId: writer.userId,
    sellerName: writer.username,
    post: content.post,
  };
};
