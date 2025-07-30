import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type {
  PostReviewRequest,
  QuickReply,
  ReservationDetails,
  ReviewDetailResponse,
  UpdateReviewRequest,
} from '@/features/rental/store/register-review/lib/types';

export const getQuickReplies = async (): Promise<QuickReply[]> => {
  const content: QuickReply[] = await axiosInstance.get(END_POINTS.STORES.REVIEW_QUICK_REPLIES);
  return content;
};

export const getReservationDetails = async (reservationId: number): Promise<ReservationDetails> => {
  const content: ReservationDetails = await axiosInstance.get(
    END_POINTS.RENTAL.RESERVATION_DETAILS(reservationId),
  );
  return content;
};

export const getReviewDetail = async (reviewId: number): Promise<ReviewDetailResponse> => {
  return await axiosInstance.get(`${END_POINTS.STORES.REVIEW}/${reviewId}`);
};

export const postReview = async (
  reservationId: number,
  reviewData: Omit<PostReviewRequest, 'reservationId'>,
): Promise<{ content: number }> => {
  const formData = new FormData();

  formData.append('reservationId', reservationId.toString());
  formData.append('comment', reviewData.comment);
  formData.append('rating', reviewData.rating.toString());

  reviewData.quickReplyIds.forEach((id) => {
    formData.append('quickReplyIds', id.toString());
  });

  if (reviewData.file && reviewData.file instanceof File) {
    formData.append('file', reviewData.file);
  }

  const response: { content: number } = await axiosInstance.post(
    END_POINTS.STORES.REVIEW,
    formData,
  );

  return response;
};

export const updateReview = async (reviewId: number, data: UpdateReviewRequest) => {
  const formData = new FormData();
  formData.append('comment', data.comment);
  formData.append('rating', data.rating.toString());
  data.quickReplyIds.forEach((id) => formData.append('quickReplyIds', id.toString()));
  if (data.file) formData.append('file', data.file);
  return await axiosInstance.patch(`${END_POINTS.STORES.REVIEW}/${reviewId}`, formData);
};

export const deleteReview = async (reviewId: number) => {
  return await axiosInstance.delete(`${END_POINTS.STORES.REVIEW}/${reviewId}`);
};
