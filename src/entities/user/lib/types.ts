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

export interface UserProfile {
  id: number;
  name: string;
  avatarSrc?: string;
  tradeCount: number;
  isFollowing: boolean;
}
