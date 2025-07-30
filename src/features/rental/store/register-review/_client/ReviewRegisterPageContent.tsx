'use client';

import { useSearchParams } from 'next/navigation';

import ReviewRegisterForm from '@/features/rental/store/register-review/ui/ReviewRegisterForm';

export default function ReviewRegisterPageContent() {
  const searchParams = useSearchParams();
  const reservationId = Number(searchParams?.get('reservationId'));

  return <ReviewRegisterForm reservationId={reservationId} />;
}
