import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type {
  ReviewMetaResponse,
  ReviewSortType,
  ReviewsQueryParams,
  ReviewsResponse,
} from '@/pages/rental/store/review/lib/types';

const SORT_PARAM_MAP: Record<ReviewSortType, string> = {
  latest: 'createdAt,desc',
  rating_high: 'reviewRating,desc',
  rating_low: 'reviewRating,asc',
};

export const getSortParam = (sortType: ReviewSortType): string => {
  return SORT_PARAM_MAP[sortType] ?? 'createdAt,desc';
};

export const getPaginatedStoreReviews = async (
  params: ReviewsQueryParams,
): Promise<ReviewsResponse> => {
  const { storeId, page, size, sort } = params;

  const response: ReviewsResponse = await axiosInstance.get(END_POINTS.RENTAL.REVIEWS(storeId), {
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
    END_POINTS.RENTAL.REVIEW_META(storeId),
  );

  return response;
};

export const getStoreReviewsWithSort = async (
  storeId: number,
  page: number,
  size: number,
  sortType: ReviewSortType,
): Promise<ReviewsResponse> => {
  return getPaginatedStoreReviews({ storeId, page, size, sort: getSortParam(sortType) });
};
