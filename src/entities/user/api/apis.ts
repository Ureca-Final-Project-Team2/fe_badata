import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type {
  CoinResponse,
  FollowingsContent,
  FollowToggleResponse,
  PostCountResponse,
  PurchaseResponse,
  SalesContent,
  UserInfoResponse
} from '@/entities/user/lib/types';
import type { ApiResponse } from '@/shared/lib/axios/responseTypes';
import type { UserTradePostsResponse } from '@/widgets/trade/post-detail/lib/types';

export const userApis = {
  getUserInfo: async (): Promise<UserInfoResponse> => {
    const response: UserInfoResponse = await axiosInstance.get(END_POINTS.USER.INFO);
    return response;
  },

  postFollowToggle: async (userId: number): Promise<FollowToggleResponse> => {
    const response: FollowToggleResponse = await axiosInstance.post(
      END_POINTS.USER.FOLLOW_TOGGLE(userId),
    );
    return response;
  },

  getFollowings: async (
    cursor?: number,
    size: number = 10,
  ): Promise<ApiResponse<FollowingsContent>> => {
    const params = new URLSearchParams();
    params.append('followType', 'FOLLOWINGS');
    if (cursor !== undefined) params.append('cursor', cursor.toString());
    params.append('size', size.toString());

    const response: ApiResponse<FollowingsContent> = await axiosInstance.get(
      `${END_POINTS.MYPAGE.FOLLOWINGS}?${params}`,
    );
    return response;
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
      ? `${END_POINTS.MYPAGE.SALES_HISTORY}/${userId}?${params}`
      : `${END_POINTS.MYPAGE.SALES_HISTORY}?${params}`;

    const response = await axiosInstance.get(url);
    return response.data;
  },

  getUserTradePosts: async (userId: number): Promise<UserTradePostsResponse> => {
    const userTradePosts: UserTradePostsResponse = await axiosInstance.get(
      END_POINTS.TRADES.USER_POST(userId),
    );
    return userTradePosts;
  },

  getPurchases: async (
    postCategory?: string,
    isSold?: boolean,
    cursor?: number,
    size: number = 30,
  ): Promise<ApiResponse<PurchaseResponse>> => {
    const params = new URLSearchParams();
    if (postCategory) params.append('postCategory', postCategory);
    if (isSold !== undefined) params.append('isSold', isSold.toString());
    if (cursor !== undefined) params.append('cursor', cursor.toString());
    params.append('size', size.toString());

    const response = await axiosInstance.get(`${END_POINTS.MYPAGE.PURCHASES_HISTORY}?${params}`);
    return response.data;
  },

  getCoin: async (): Promise<ApiResponse<CoinResponse>> => {
    const response = await axiosInstance.get(END_POINTS.MYPAGE.COIN);
    return response.data;
  },
  getUserPostCount: async (tradeType: 'SALE' | 'PURCHASE'): Promise<number> => {
    const response = await axiosInstance.get<PostCountResponse>(
      END_POINTS.MYPAGE.POST_COUNT,
      { params: { tradeType } },
    );
    console.log('🛰️ getUserPostCount 응답:', response); // 👉 이미 { postCount: 9 }
    return response.postCount ?? 0;
  },
};