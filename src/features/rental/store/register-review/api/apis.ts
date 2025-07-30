import { END_POINTS } from '@/shared/api/endpoints';
import { axiosInstance } from '@/shared/lib/axios/axiosInstance';

import type {
  PostReviewRequest,
  QuickReply,
  ReservationDetails,
} from '@/features/rental/store/register-review/lib/types';

// 퀵 리플라이 목록 조회
export const getQuickReplies = async (): Promise<QuickReply[]> => {
  const content: QuickReply[] = await axiosInstance.get(END_POINTS.STORES.REVIEW_QUICK_REPLIES);
  return content;
};

// 특정 예약의 상세 정보 조회(가맹점, 대여 기기, 방문 횟수)
export const getReservationDetails = async (reservationId: number): Promise<ReservationDetails> => {
  const content: ReservationDetails = await axiosInstance.get(
    END_POINTS.RENTAL.RESERVATION_DETAILS(reservationId),
  );
  return content;
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
