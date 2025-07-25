import { useQuery } from '@tanstack/react-query';

import { getUserCoin } from '@/pages/mypage/coin-history/api/apis';

import type { UserCoin } from '../lib/types';

export const useUserCoinQuery = () => {
  return useQuery<UserCoin>({
    queryKey: ['userCoin'],
    queryFn: getUserCoin,
    enabled: typeof window !== 'undefined',
  });
};
