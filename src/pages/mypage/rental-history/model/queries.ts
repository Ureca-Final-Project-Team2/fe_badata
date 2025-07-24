import { useQuery } from '@tanstack/react-query';

import { getRentalHistory } from '../api/apis';

export const useRentalHistoryQuery = (cursor?: number, size: number = 10) => {
  return useQuery({
    queryKey: ['rentalHistory', cursor, size],
    queryFn: () => getRentalHistory(cursor, size),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
