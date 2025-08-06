'use client';

import { lazy, Suspense } from 'react';

const RentalPage = lazy(() => import('@/features/rental/map/page/RentalPage'));

// Loading fallback component
const RentalLoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-gray-500">대여 페이지 로딩 중...</div>
  </div>
);

export default function Page() {
  return (
    <Suspense fallback={<RentalLoadingFallback />}>
      <RentalPage />
    </Suspense>
  );
}
