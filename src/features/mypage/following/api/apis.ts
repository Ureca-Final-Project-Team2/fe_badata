import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { FollowResponse } from '@/entities/follow';

const FOLLOW_TYPES = {
  FOLLOWERS: 'FOLLOWERS',
  FOLLOWINGS: 'FOLLOWINGS',
} as const;

export const fetchFollowings = async (
  cursor?: number,
  size: number = 10,
): Promise<FollowResponse> => {
  try {
    const response = await axiosInstance.get(END_POINTS.MYPAGE.FOLLOWINGS, {
      params: {
        followType: FOLLOW_TYPES.FOLLOWINGS,
        cursor,
        size,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFollowing = async (
  followId: number,
): Promise<{ code: number; message: string; content: number }> => {
  try {
    const response = await axiosInstance.delete(END_POINTS.MYPAGE.DELETE_FOLLOW(followId));
    return response.data;
  } catch (error) {
    throw error;
  }
};
