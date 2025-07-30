import { useQuery } from '@tanstack/react-query';

import { getRentalHistory } from '@/features/mypage/rental-history/api/apis';

import type { RentalHistoryItem } from '@/features/mypage/rental-history/lib/types';

export const useRentalHistoryQuery = (cursor?: number, size: number = 10) => {
  return useQuery<{ item: RentalHistoryItem[]; nextCursor: number; hasNext: boolean }>({
    queryKey: ['rentalHistory', cursor, size],
    queryFn: () => getRentalHistory(cursor, size),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
