export interface FollowerItem {
  id: number;
  userId: number;
  nickname: string;
  profileImageUrl: string;
}

export interface FollowerResponse {
  code: number;
  message: string | null;
  content: {
    item: FollowerItem[];
    nextCursor: number;
    hasNext: boolean;
  };
} 