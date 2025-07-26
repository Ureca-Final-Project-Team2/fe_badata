import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { FollowerItem } from '@/pages/mypage/follower/lib/types';

export interface FollowerResponse {
  item: FollowerItem[];
  nextCursor: number;
  hasNext: boolean;
}

export const fetchFollowers = async (
  cursor?: number,
  size: number = 10,
): Promise<FollowerResponse> => {
  const response = await axiosInstance.get(END_POINTS.MYPAGE.FOLLOWERS, {
    params: { 
      followType: 'FOLLOWERS',
      cursor, 
      size 
    },
  });
  
  return response.data.content;
}; 