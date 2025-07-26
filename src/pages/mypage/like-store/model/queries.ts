import { useQuery } from '@tanstack/react-query';

import { fetchLikedStores } from '@/pages/mypage/like-store/api/apis';

import type { LikeStoreItem } from '@/pages/mypage/like-store/lib/types';

export function useLikedStores(cursor?: number, size: number = 10) {
  const {
    data: likeStoreItems,
    isLoading,
    isError,
  } = useQuery<LikeStoreItem[]>({
    queryKey: ['likedStores', cursor, size],
    queryFn: () => fetchLikedStores(cursor, size),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { likeStoreItems, isLoading, isError };
}
