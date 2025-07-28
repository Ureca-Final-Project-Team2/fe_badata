import { useInfiniteQuery } from '@tanstack/react-query';

import {
  getAddressHistoryList,
  type AddressHistoryListResponse,
} from '@/pages/rental/search/api/apis';

// 주소 이력 무한스크롤 조회 hook
export const useGetAddressHistoryInfinite = (
  size: number = 10,
  sort: string = 'createdAt,desc',
) => {
  return useInfiniteQuery<AddressHistoryListResponse, Error>({
    queryKey: ['addressHistoryInfinite', size, sort],
    queryFn: ({ pageParam = 0 }) => getAddressHistoryList(pageParam as number, size, sort),
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (!lastPage.hasNext) return undefined;
      return typeof lastPageParam === 'number' ? lastPageParam + 1 : 1;
    },
    initialPageParam: 0,
  });
};
