import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getUserCoinHistory } from '@/features/mypage/coin-history/api/apis';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

export const useUserCoinQuery = () =>
  useQuery({
    queryKey: ['user-coin'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/v1/users/coin');
      return res.data.content; 
    },
  });

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
