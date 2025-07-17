import { useQuery } from '@tanstack/react-query';

import { getUserCoin } from '@/pages/mypage/api/mypage';

import type { UserCoin } from '@/pages/mypage/lib/types';

export const useUserCoinQuery = () => {
  return useQuery<UserCoin>({
    queryKey: ['userCoin'],
    queryFn: getUserCoin,
    enabled: typeof window !== 'undefined',
  });
}