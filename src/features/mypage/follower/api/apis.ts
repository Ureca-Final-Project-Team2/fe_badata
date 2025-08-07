import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { FollowerResponse } from '@/features/mypage/follower/lib/types';

const FOLLOW_TYPES = {
  FOLLOWERS: 'FOLLOWERS',
  FOLLOWINGS: 'FOLLOWINGS',
} as const;

export const fetchFollowers = async (
  cursor?: number,
  size: number = 10,
): Promise<FollowerResponse> => {
  try {
    const response = await axiosInstance.get(END_POINTS.MYPAGE.FOLLOWERS, {
      params: {
        followType: FOLLOW_TYPES.FOLLOWERS,
        cursor,
        size,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
