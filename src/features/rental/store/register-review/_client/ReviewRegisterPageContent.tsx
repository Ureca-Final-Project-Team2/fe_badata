'use client';
import { useSearchParams } from 'next/navigation';

import { useReviewDetailQuery } from '@/features/rental/store/register-review/model/queries';
import ReviewRegisterForm from '@/features/rental/store/register-review/ui/ReviewRegisterForm';

export default function ReviewRegisterPageContent() {
  const searchParams = useSearchParams();
  const reviewId = Number(searchParams?.get('reviewId'));
  const mode = (searchParams?.get('mode') as 'register' | 'edit') || 'register';
  const reservationId = Number(searchParams?.get('reservationId'));

  const { data: reviewDetail } = useReviewDetailQuery(reviewId);

  return (
    <ReviewRegisterForm
      reservationId={reservationId}
      mode={mode}
      reviewDetail={mode === 'edit' ? reviewDetail : undefined}
    />
  );
}
