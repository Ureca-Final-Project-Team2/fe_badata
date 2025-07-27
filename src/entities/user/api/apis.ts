import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { CoinResponse, FollowingsContent, SalesContent } from '@/entities/user/lib/types';
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

    const response = await axiosInstance.get(`${END_POINTS.MYPAGE.FOLLOWINGS}?${params}`);
    return response.data;
  },

  getSales: async (
    userId?: number,
    postCategory?: string,
    isSold?: boolean,
    cursor?: number,
    size: number = 30,
  ): Promise<ApiResponse<SalesContent>> => {
    const params = new URLSearchParams();
    if (postCategory) params.append('postCategory', postCategory);
    if (isSold !== undefined) params.append('isSold', isSold.toString());
    if (cursor !== undefined) params.append('cursor', cursor.toString());
    params.append('size', size.toString());

    const url = userId
      ? `${END_POINTS.USER.SALES}/${userId}?${params}`
      : `${END_POINTS.USER.SALES}?${params}`;

    const response = await axiosInstance.get(url);
    return response.data;
  },

  getUserTradePosts: async (userId: number): Promise<UserTradePostsResponse> => {
    const userTradePosts: UserTradePostsResponse = await axiosInstance.get(
      END_POINTS.TRADES.USER_POST(userId),
    );
    return userTradePosts;
  },

  getCoin: async (): Promise<ApiResponse<CoinResponse>> => {
    const response = await axiosInstance.get(END_POINTS.USER.COIN);
    console.log('Raw Coin API Response:', response);
    return response.data;
  },
};
