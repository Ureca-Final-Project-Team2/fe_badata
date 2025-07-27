import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { FollowingResponse } from '@/pages/mypage/following/lib/types';

const FOLLOW_TYPES = {
  FOLLOWERS: 'FOLLOWERS',
  FOLLOWINGS: 'FOLLOWINGS'
} as const;

export const fetchFollowings = async (
  cursor?: number,
  size: number = 10,
): Promise<FollowingResponse> => {
  try {
    const response = await axiosInstance.get(END_POINTS.MYPAGE.FOLLOWINGS, {
      params: { 
        followType: FOLLOW_TYPES.FOLLOWINGS,
        cursor, 
        size 
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('팔로잉 목록 조회 실패:', error);
    throw error;
  }
}; 