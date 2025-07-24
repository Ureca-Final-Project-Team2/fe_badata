export interface FollowResponse {
  code: number;
  message: string | null;
  content: {
    following: boolean;
  } | null;
}

export interface FollowingsResponse {
  code: number;
  message: string;
  content: {
    item: Array<{
      id: number;
      userId: number;
      nickname: string;
      profileImageUrl: string;
    }>;
    nextCursor: number;
    hasNext: boolean;
  };
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

export interface SalesResponse {
  code: number;
  message: string | null;
  content: {
    item: SalesItem[];
    nextCursor: number;
    hasNext: boolean;
  };
}

export interface UserProfile {
  id: number;
  name: string;
  avatarSrc?: string;
  tradeCount: number;
  isFollowing: boolean;
}
