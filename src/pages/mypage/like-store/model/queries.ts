import { useQuery } from '@tanstack/react-query';

import { fetchLikedStores } from '@/pages/mypage/like-store/api/apis';

import type { LikeStoreItem } from '@/pages/mypage/like-store/lib/types';

export function useLikedStores(cursor?: number, size: number = 10) {
  const { data, isLoading, isError } = useQuery<{
    item: LikeStoreItem[];
    nextCursor: number;
    hasNext: boolean;
  }>({
    queryKey: ['likedStores', cursor, size],
    queryFn: () => fetchLikedStores(cursor, size),
  });

  return {
    likeStoreItems: data?.item ?? [],
    nextCursor: data?.nextCursor,
    hasNext: data?.hasNext,
    isLoading,
    isError,
  };
}
