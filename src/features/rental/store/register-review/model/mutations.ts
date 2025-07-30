import { useMutation } from '@tanstack/react-query';

import {
  deleteReview,
  postReview,
  updateReview,
} from '@/features/rental/store/register-review/api/apis';
import { ErrorMessageMap } from '@/shared/config/errorCodes';
import { HTTPError } from '@/shared/lib/HTTPError';
import { makeToast } from '@/shared/lib/makeToast';
import { queryClient } from '@/shared/lib/queryClient';

import type {
  PostReviewRequest,
  UpdateReviewRequest,
} from '@/features/rental/store/register-review/lib/types';
import type { ErrorCode } from '@/shared/config/errorCodes';

export const usePostReviewMutation = () => {
  return useMutation({
    mutationFn: ({
      reservationId,
      reviewData,
    }: {
      reservationId: number;
      reviewData: PostReviewRequest;
    }) => postReview(reservationId, reviewData),
  });
};

export const useUpdateReviewMutation = () => {
  return useMutation({
    mutationFn: ({ reviewId, reviewData }: { reviewId: number; reviewData: UpdateReviewRequest }) =>
      updateReview(reviewId, reviewData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['review'] }),
  });
};

export const useDeleteReviewMutation = () => {
  return useMutation({
    mutationFn: deleteReview,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['review'] }),
    onError: (error) => {
      if (error instanceof HTTPError) {
        const errorMessage = ErrorMessageMap[error.code as ErrorCode] ?? error.message;
        makeToast(errorMessage, 'warning');
      }
    },
  });
};
