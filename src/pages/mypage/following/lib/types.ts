export interface FollowingItem {
  id: number;
  userId: number;
  nickname: string;
  profileImageUrl: string;
}

export interface FollowingResponse {
  code: number;
  message: string | null;
  content: {
    item: FollowingItem[];
    nextCursor: number;
    hasNext: boolean;
  };
} 