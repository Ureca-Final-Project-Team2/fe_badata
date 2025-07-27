export interface FollowItem {
  id: number;
  userId: number;
  nickname: string;
  profileImageUrl: string;
}

export interface FollowResponse {
  code: number;
  message: string | null;
  content: {
    item: FollowItem[];
    nextCursor: number;
    hasNext: boolean;
  };
}

export interface DeleteFollowResponse {
  code: number;
  message: string;
  content: number;
}

export const FOLLOW_TYPES = {
  FOLLOWERS: 'FOLLOWERS',
  FOLLOWINGS: 'FOLLOWINGS'
} as const;

export type FollowType = typeof FOLLOW_TYPES[keyof typeof FOLLOW_TYPES]; 