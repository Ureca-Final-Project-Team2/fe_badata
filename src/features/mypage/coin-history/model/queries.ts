import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getUserCoin, getUserCoinHistory } from '@/features/mypage/coin-history/api/apis';

export const useUserCoinQuery = () => {
  return useQuery<{ coin: number }>({
    queryKey: ['user-coin'],
    queryFn: getUserCoin,
    staleTime: 1000 * 60,
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
