import { useInfiniteQuery } from '@tanstack/react-query';

import { getAddressHistoryList } from '@/pages/rental/search/api/apis';

export const useGetAddressHistoryInfinite = (size: number, sort: string = 'lastUsed,desc') => {
  return useInfiniteQuery({
    queryKey: ['addressHistory', size, sort],
    queryFn: ({ pageParam = 0 }) => getAddressHistoryList(pageParam, size, sort),
    getNextPageParam: (lastPage) => {
      if (!lastPage?.content?.hasNext) return undefined;
      return lastPage.content.getAddressResponses.length > 0 ? lastPage.content.getAddressResponses.length / size : undefined;
    },
    initialPageParam: 0,
  });
};
