import { useQuery } from '@tanstack/react-query';

import { userApis } from '../api/apis';

import type { FollowingsContent, SalesContent } from '@/entities/user/lib/types';
import type { ApiResponse } from '@/shared/lib/axios/responseTypes';
import type { UserTradePostsResponse } from '@/widgets/trade/post-detail/lib/types';

// 팔로우 목록 조회 훅
export const useFollowingsQuery = (cursor?: number, size: number = 10) => {
  return useQuery<ApiResponse<FollowingsContent>>({
    queryKey: ['user', 'followings', cursor, size],
    queryFn: () => userApis.getFollowings(cursor, size),
    staleTime: 5 * 60 * 1000,
  });
};

// 모든 팔로잉 목록 조회 훅 (팔로우 상태 확인용)
export const useAllFollowingsQuery = () => {
  return useQuery<ApiResponse<FollowingsContent>>({
    queryKey: ['user', 'all-followings'],
    queryFn: async () => {
      let allItems: Array<{
        id: number;
        userId: number;
        nickname: string;
        profileImageUrl: string;
      }> = [];
      let cursor: number | undefined;
      let hasNext = true;

      while (hasNext) {
        const response = await userApis.getFollowings(cursor, 100); // 최대 100개씩 가져오기
        const items = response.content?.item || [];
        allItems = [...allItems, ...items];

        hasNext = response.content?.hasNext || false;
        cursor = response.content?.nextCursor;
      }

      return {
        code: 20000,
        message: undefined,
        content: {
          item: allItems,
          nextCursor: 0,
          hasNext: false,
        },
      };
    },
    staleTime: 5 * 60 * 1000,
  });
};

// 판매 내역 조회 훅
export const useSalesQuery = (
  userId?: number,
  postCategory?: string,
  isSold?: boolean,
  cursor?: number,
  size: number = 30,
) => {
  return useQuery<ApiResponse<SalesContent>>({
    queryKey: ['user', 'sales', userId, postCategory, isSold, cursor, size],
    queryFn: () => userApis.getSales(userId, postCategory, isSold, cursor, size),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

// 사용자 거래 게시물 조회 훅
export const useUserTradePostsQuery = (userId?: number) => {
  return useQuery<UserTradePostsResponse>({
    queryKey: ['user', 'trade-posts', userId],
    queryFn: () => {
      if (!userId) throw new Error('userId is required');
      return userApis.getUserTradePosts(userId);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

// 특정 사용자의 거래된 총 게시물의 수 조회 훅
export const useUserSoldPostsCountQuery = (userId?: number) => {
  const { data: userTradePosts } = useUserTradePostsQuery(userId);

  const soldPostsCount = userTradePosts?.soldedPostsResponse?.postsResponse?.length ?? 0;
  const displayCount = soldPostsCount >= 100 ? '100+' : soldPostsCount;

  return {
    data: displayCount,
    isLoading: !userTradePosts,
    error: null,
  };
};
