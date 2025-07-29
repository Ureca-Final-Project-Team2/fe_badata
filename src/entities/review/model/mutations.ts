import { useMutation } from '@tanstack/react-query';

import { deleteReview, postReview, putReview } from '@/entities/review/api/apis';
import { type PostReviewRequest, type ReviewResponse } from '@/entities/review/lib/types';

import type { PutReviewRequest } from '@/entities/review/lib/types';

interface PostReviewVariables {
  reservationId: number;
  reviewData: Omit<PostReviewRequest, 'reservationId'>;
}

interface PutReviewVariables {
  reviewId: number;
  reviewData: PutReviewRequest;
}

export const usePostReviewMutation = () => {
  return useMutation<ReviewResponse, Error, PostReviewVariables>({
    mutationFn: ({ reservationId, reviewData }) => postReview(reservationId, reviewData),
  });
};

export const usePutReviewMutation = () => {
  return useMutation<ReviewResponse, Error, PutReviewVariables>({
    mutationFn: ({ reviewId, reviewData }) => putReview(reviewId, reviewData),
  });
};

export const useDeleteReviewMutation = () => {
  return useMutation<ReviewResponse, Error, number>({
    mutationFn: (reviewId: number) => deleteReview(reviewId),
  });
};
