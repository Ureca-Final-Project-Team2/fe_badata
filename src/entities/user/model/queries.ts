import { useQuery } from '@tanstack/react-query';

import { userApis } from '../api/apis';

import type { FollowResponse, SalesResponse } from '@/entities/user/lib/types';

// 팔로우 상태 조회 훅
export const useFollowStatusQuery = (userId: number) => {
  return useQuery<FollowResponse>({
    queryKey: ['user', 'follow-status', userId],
    queryFn: () => userApis.getFollowStatus(userId),
    enabled: !!userId,
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
  return useQuery<SalesResponse>({
    queryKey: ['user', 'sales', userId, postCategory, isSold, cursor, size],
    queryFn: () => userApis.getSales(userId, postCategory, isSold, cursor, size),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

// 특정 사용자의 거래된 총 게시물의 수 조회 훅
export const useUserSoldPostsCountQuery = (userId?: number) => {
  return useQuery<number | string>({
    queryKey: ['user', 'sold-posts-count', userId],
    queryFn: () => userApis.getUserSoldPostsCount(userId!),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};
