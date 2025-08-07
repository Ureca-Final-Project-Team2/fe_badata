import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { DeleteFollowResponse, FollowResponse, FollowType } from '@/entities/follow/lib/types';

export const fetchFollows = async (
  followType: FollowType,
  cursor?: number,
  size: number = 10,
): Promise<FollowResponse> => {
  try {
    const response = await axiosInstance.get(END_POINTS.MYPAGE.FOLLOWERS, {
      params: {
        followType,
        cursor,
        size,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFollow = async (followId: number): Promise<DeleteFollowResponse> => {
  try {
    const response = await axiosInstance.delete(END_POINTS.MYPAGE.DELETE_FOLLOW(followId));
    return response.data;
  } catch (error) {
    throw error;
  }
};
