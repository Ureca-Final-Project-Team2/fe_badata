import { useQuery } from '@tanstack/react-query';

import { fetchLikedStores } from '../api/apis';

export function useLikedStores(cursor?: number, size: number = 10) {
  return useQuery({
    queryKey: ['likedStores', cursor, size],
    queryFn: () => fetchLikedStores(cursor, size),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
} 