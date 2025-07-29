'use client';

import { useSearchParams } from 'next/navigation';

import ReviewRegisterForm from '@/features/rental/store/register-review/ui/ReviewRegisterForm';
import { BaseLayout } from '@/shared/ui/BaseLayout';

export default function RegisterReviewPage() {
  const searchParams = useSearchParams();
  const reservationId = Number(searchParams?.get('reservationId'));

  return (
    <BaseLayout showHeader={false}>
      <ReviewRegisterForm reservationId={reservationId} />
    </BaseLayout>
  );
}
