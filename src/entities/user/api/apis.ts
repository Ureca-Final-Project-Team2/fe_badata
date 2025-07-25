import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type { SalesResponse } from '@/entities/user/lib/types';
import type { UserTradePostsResponse } from '@/widgets/trade/post-detail/lib/types';

export const userApis = {
  // 팔로우/언팔로우 토글
  postFollowToggle: async (userId: number) => {
    const response = await axiosInstance.post(END_POINTS.USER.FOLLOW(userId));
    return response.data;
  },

  // 팔로잉 목록 조회
  getFollowings: async (cursor?: number, size: number = 10) => {
    const params = new URLSearchParams();
    params.append('followType', 'FOLLOWINGS');
    if (cursor !== undefined) params.append('cursor', cursor.toString());
    params.append('size', size.toString());

    const response = await axiosInstance.get(`${END_POINTS.USER.GET_FOLLOWS}?${params}`);
    return response.data;
  },

  // 특정 사용자 팔로우 상태 확인
  getFollowStatus: async (targetUserId: number) => {
    let cursor: number | undefined;
    let isFollowing = false;

    do {
      const data = await userApis.getFollowings(cursor, 100);
      const items = data.content?.item || [];

      if (items.some((user: { userId: number }) => user.userId === targetUserId)) {
        isFollowing = true;
        break;
      }

      cursor = data.content?.lastCursor;
    } while (cursor);

    return {
      code: 20000,
      message: null,
      content: {
        following: isFollowing,
      },
    };
  },

  // 판매 내역 조회 (거래된 게시물)
  getSales: async (
    userId?: number,
    postCategory?: string,
    isSold?: boolean,
    cursor?: number,
    size: number = 30,
  ): Promise<SalesResponse> => {
    const params = new URLSearchParams();
    if (postCategory) params.append('postCategory', postCategory);
    if (isSold !== undefined) params.append('isSold', isSold.toString());
    if (cursor !== undefined) params.append('cursor', cursor.toString());
    params.append('size', size.toString());

    // userId가 있으면 URL에 포함, 없으면 현재 사용자의 거래내역
    const url = userId
      ? `${END_POINTS.USER.SALES}/${userId}?${params}`
      : `${END_POINTS.USER.SALES}?${params}`;

    try {
      const response = await axiosInstance.get<SalesResponse['content']>(url);
      return {
        code: 20000,
        message: null,
        content: response.data,
      };
    } catch (error) {
      console.error('Sales API 호출 실패:', error);
      throw new Error('판매 내역을 불러오는데 실패했습니다.');
    }
  },

  // 특정 사용자의 거래된 총 게시물의 수 조회 (100개 이상이면 100+ 반환)
  getUserSoldPostsCount: async (userId: number): Promise<number | string> => {
    try {
      const response = await axiosInstance.get(END_POINTS.TRADES.USER_POST(userId));

      if (!response) {
        return 0;
      }

      // response가 content인 경우 (인터셉터에 의해 변환됨)
      if (response && typeof response === 'object' && 'soldedPostsResponse' in response) {
        const userTradePosts = response as unknown as UserTradePostsResponse;
        const soldedPosts = userTradePosts.soldedPostsResponse?.postsResponse || [];
        const totalCount = soldedPosts.length;

        // 100개 이상이면 "100+" 반환
        if (totalCount >= 100) {
          return '100+';
        }

        return totalCount;
      }

      return 0;
    } catch {
      return 0;
    }
  },
};
