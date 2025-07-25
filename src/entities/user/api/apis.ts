import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import { userService } from '../services/userService';

import type { FollowingsContent, SalesContent } from '@/entities/user/lib/types';
import type { ApiResponse } from '@/shared/lib/axios/responseTypes';
import type { UserTradePostsResponse } from '@/widgets/trade/post-detail/lib/types';

export const userApis = {
  postFollowToggle: async (userId: number) => {
    const response = await axiosInstance.post(END_POINTS.USER.FOLLOW(userId));
    return response.data;
  },

  getFollowings: async (
    cursor?: number,
    size: number = 10,
  ): Promise<ApiResponse<FollowingsContent>> => {
    const params = new URLSearchParams();
    params.append('followType', 'FOLLOWINGS');
    if (cursor !== undefined) params.append('cursor', cursor.toString());
    params.append('size', size.toString());

    const response = await axiosInstance.get(`${END_POINTS.USER.GET_FOLLOWS}?${params}`);
    return response.data;
  },

  getSales: async (
    userId?: number,
    postCategory?: string,
    isSold?: boolean,
    cursor?: number,
    size: number = 30,
  ): Promise<ApiResponse<SalesContent>> => {
    try {
      const params = new URLSearchParams();
      if (postCategory) params.append('postCategory', postCategory);
      if (isSold !== undefined) params.append('isSold', isSold.toString());
      if (cursor !== undefined) params.append('cursor', cursor.toString());
      params.append('size', size.toString());

      const url = userId
        ? `${END_POINTS.USER.SALES}/${userId}?${params}`
        : `${END_POINTS.USER.SALES}?${params}`;

      const content: SalesContent = await axiosInstance.get(url);
      return {
        code: 20000,
        message: undefined,
        content,
      };
    } catch (error) {
      console.error('Sales API 호출 실패:', error);
      throw new Error('판매 내역을 불러오는데 실패했습니다.');
    }
  },

  getUserSoldPostsCount: async (userId: number): Promise<number | string> => {
    try {
      const userTradePosts: UserTradePostsResponse = await axiosInstance.get(
        END_POINTS.TRADES.USER_POST(userId),
      );
      return userService.calculateSoldPostsCount(userTradePosts);
    } catch {
      return 0;
    }
  },
};
