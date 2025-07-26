import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { FollowingItem } from '@/pages/mypage/following/lib/types';

export interface FollowingResponse {
  item: FollowingItem[];
  nextCursor: number;
  hasNext: boolean;
}

export const fetchFollowings = async (
  cursor?: number,
  size: number = 10,
): Promise<FollowingResponse> => {
  const response = await axiosInstance.get(END_POINTS.MYPAGE.FOLLOWINGS, {
    params: { 
      followType: 'FOLLOWINGS',
      cursor, 
      size 
    },
  });
  return response.data.content;
}; 