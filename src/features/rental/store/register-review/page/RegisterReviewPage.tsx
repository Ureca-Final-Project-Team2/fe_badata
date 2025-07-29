'use client';

import { Suspense } from 'react';

import { useSearchParams } from 'next/navigation';

import { BaseLayout } from '@/shared/ui/BaseLayout';

import ReviewRegisterForm from '../ui/ReviewRegisterForm';

export default function RegisterReviewPage() {
  const searchParams = useSearchParams();
  const reservationId = Number(searchParams?.get('reservationId'));

  return (
    <BaseLayout showHeader={false}>
      <Suspense fallback={<div>리뷰 등록 폼을 불러오는 중입니다...</div>}>
        <ReviewRegisterForm reservationId={reservationId} />
      </Suspense>
    </BaseLayout>
  );
}
