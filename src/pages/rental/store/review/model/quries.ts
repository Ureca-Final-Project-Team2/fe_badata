import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getStoreReviewMeta, getStoreReviewsWithSort } from '@/pages/rental/store/review/api/apis';

import type { ReviewSortType } from '@/pages/rental/store/review/lib/types';

export const reviewQueryKeys = {
  all: ['review'] as const,
  store: (storeId: number) => [...reviewQueryKeys.all, 'store', storeId] as const,
  storeReviews: (storeId: number, sortType: ReviewSortType) =>
    [...reviewQueryKeys.store(storeId), 'list', sortType] as const,
  storeMeta: (storeId: number) => [...reviewQueryKeys.store(storeId), 'meta'] as const,
};

export const useStoreReview = (
  storeId: number,
  page: number,
  size: number,
  sortType: ReviewSortType,
) => {
  return useQuery({
    queryKey: [...reviewQueryKeys.storeReviews(storeId, sortType), page, size],
    queryFn: () => getStoreReviewsWithSort(storeId, page, size, sortType),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useStoreReviewMeta = (storeId: number) => {
  return useQuery({
    queryKey: reviewQueryKeys.storeMeta(storeId),
    queryFn: () => getStoreReviewMeta(storeId),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useInfiniteStoreReviews = (
  storeId: number,
  size: number = 20,
  sortType: ReviewSortType = 'latest',
) => {
  return useInfiniteQuery({
    queryKey: reviewQueryKeys.storeReviews(storeId, sortType),
    queryFn: ({ pageParam = 0 }) => getStoreReviewsWithSort(storeId, pageParam, size, sortType),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length : undefined;
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    initialPageParam: 0,
  });
};
