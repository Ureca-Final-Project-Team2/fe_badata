import { useInfiniteQuery } from '@tanstack/react-query';

import { getAddressHistoryList } from '@/features/rental/search/api/apis';

export const useGetAddressHistoryInfinite = (size: number, sort: string = 'lastUsed,desc') => {
  console.log('useGetAddressHistoryInfinite 호출:', { size, sort });

  return useInfiniteQuery({
    queryKey: ['addressHistory', size, sort],
    queryFn: async ({ pageParam = 0 }) => {
      const result = await getAddressHistoryList(pageParam, size, sort);
      return result;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage?.content?.hasNext) return undefined;
      return lastPage.content.getAddressResponses.length > 0
        ? lastPage.content.getAddressResponses.length / size
        : undefined;
    },
    initialPageParam: 0,
  });
};
