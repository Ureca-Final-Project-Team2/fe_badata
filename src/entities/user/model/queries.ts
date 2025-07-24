import { useQuery } from '@tanstack/react-query';

import { userApis } from '../api/apis';

import type { FollowResponse } from '../lib/types';

// 팔로우 상태 조회 훅
export const useFollowStatusQuery = (userId: number) => {
  return useQuery<FollowResponse>({
    queryKey: ['user', 'follow-status', userId],
    queryFn: () => userApis.getFollowStatus(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};
