import { useQuery } from '@tanstack/react-query';

import { getUserDataUsage } from '@/pages/mypage/api/mypage';

import type { UserDataUsage } from '@/pages/mypage/lib/types';

export const useUserDataUsageQuery = () => {
  return useQuery<UserDataUsage>({
    queryKey: ['userDataUsage'],
    queryFn: getUserDataUsage,
  });
};
