import { useQuery } from '@tanstack/react-query';

import { getUserCoin, getUserCoinHistory } from '@/pages/mypage/coin-history/api/apis';

import type { CoinHistoryParams, UserCoin } from '@/pages/mypage/coin-history/lib/types';

export const useUserCoinQuery = () => {
  return useQuery<UserCoin>({
    queryKey: ['userCoin'],
    queryFn: getUserCoin,
    enabled: typeof window !== 'undefined',
  });
};

export const useUserCoinHistoryQuery = (params?: CoinHistoryParams) => {
  return useQuery({
    queryKey: ['userCoinHistory', params],
    queryFn: () => getUserCoinHistory(params),
    enabled: typeof window !== 'undefined',
  });
};
