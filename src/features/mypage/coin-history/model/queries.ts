import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getUserCoin, getUserCoinHistory } from '@/features/mypage/coin-history/api/apis';

import type { UserCoin } from '@/features/mypage/coin-history/lib/types';

export const useUserCoinQuery = () => {
  return useQuery<UserCoin>({
    queryKey: ['userCoin'],
    queryFn: getUserCoin,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

export const useUserCoinHistoryInfiniteQuery = (size: number = 10) => {
  return useInfiniteQuery({
    queryKey: ['userCoinHistory', 'infinite'],
    queryFn: ({ pageParam }) => getUserCoinHistory({ cursor: pageParam, size }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};
