import { useQuery } from '@tanstack/react-query';

import {
  getAddressHistoryList,
  type AddressHistoryListResponse,
} from '@/pages/rental/search/api/apis';

// 주소 이력 조회 hook
export const useGetAddressHistory = (
  page: number = 0,
  size: number = 10,
  sort: string = 'createdAt,desc',
) => {
  return useQuery<AddressHistoryListResponse, Error>({
    queryKey: ['addressHistory', page, size, sort],
    queryFn: () => getAddressHistoryList(page, size, sort),
  });
};
