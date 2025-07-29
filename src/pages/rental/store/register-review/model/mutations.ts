import { useMutation } from '@tanstack/react-query';

import { postReview } from '@/pages/rental/store/register-review/api/apis';

import type {
  PostReviewRequest,
  PostReviewResponse,
} from '@/pages/rental/store/register-review/lib/types';

interface PostReviewVariables {
  reservationId: number;
  reviewData: Omit<PostReviewRequest, 'reservationId'>;
}

export const usePostReviewMutation = () => {
  return useMutation<PostReviewResponse, Error, PostReviewVariables>({
    mutationFn: ({ reservationId, reviewData }) => postReview(reservationId, reviewData),
  });
};
