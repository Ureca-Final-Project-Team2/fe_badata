import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { DeleteFollowResponse, FollowResponse } from '@/entities/follow';

const FOLLOW_TYPES = {
  FOLLOWERS: 'FOLLOWERS',
  FOLLOWINGS: 'FOLLOWINGS'
} as const;

export const fetchFollowers = async (
  cursor?: number,
  size: number = 10,
): Promise<FollowResponse> => {
  try {
    const response = await axiosInstance.get(END_POINTS.MYPAGE.FOLLOWERS, {
      params: { 
        followType: FOLLOW_TYPES.FOLLOWERS,
        cursor, 
        size 
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('팔로워 목록 조회 실패:', error);
    throw error;
  }
};

export const deleteFollower = async (followId: number): Promise<DeleteFollowResponse> => {
  try {
    const response = await axiosInstance.delete(END_POINTS.MYPAGE.DELETE_FOLLOW(followId));
    return response.data;
  } catch (error) {
    console.error('팔로워 삭제 실패:', error);
    throw error;
  }
}; 