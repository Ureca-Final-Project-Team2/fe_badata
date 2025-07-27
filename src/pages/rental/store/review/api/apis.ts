import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type {
  ReviewMetaResponse,
  ReviewSortType,
  ReviewsQueryParams,
  ReviewsResponse,
} from '../lib/types';

export const getSortParam = (sortType: ReviewSortType): string => {
  switch (sortType) {
    case 'rating_high':
      return 'reviewRating,desc';
    case 'rating_low':
      return 'reviewRating,asc';
    case 'latest':
    default:
      return 'createdAt,desc';
  }
};

export const getStoreReviews = async (params: ReviewsQueryParams): Promise<ReviewsResponse> => {
  const { storeId, page, size, sort } = params;

  const response: ReviewsResponse = await axiosInstance.get(END_POINTS.STORES.REVIEWS(storeId), {
    params: {
      page,
      size,
      sort,
    },
  });

  return response;
};

export const getStoreReviewMeta = async (storeId: number): Promise<ReviewMetaResponse> => {
  const response: ReviewMetaResponse = await axiosInstance.get(
    END_POINTS.STORES.REVIEW_META(storeId),
  );

  return response;
};

export const getStoreReviewsWithSort = async (
  storeId: number,
  page: number,
  size: number,
  sortType: ReviewSortType,
): Promise<ReviewsResponse> => {
  return getStoreReviews({ storeId, page, size, sort: getSortParam(sortType) });
};
