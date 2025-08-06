'use client';

import { lazy, Suspense } from 'react';

import { BaseLayout } from '@/shared/ui/BaseLayout';

const RentalPageContent = lazy(() => import('@/features/rental/map/page/RentalPage'));

// Loading fallback component for main content
const RentalContentLoadingFallback = () => (
  <BaseLayout>
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--main-5)] mx-auto mb-4"></div>
        <p className="text-[var(--main-5)]">대여 페이지 로딩 중...</p>
      </div>
    </div>
  </BaseLayout>
);

export default function Page() {
  return (
    <Suspense fallback={<RentalContentLoadingFallback />}>
      <RentalPageContent />
    </Suspense>
  );
}
