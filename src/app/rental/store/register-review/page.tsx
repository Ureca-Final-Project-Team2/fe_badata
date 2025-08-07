import { lazy, Suspense } from 'react';

import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header } from '@/shared/ui/Header';

const RegisterReviewContent = lazy(
  () => import('@/features/rental/store/register-review/page/RegisterReviewPage'),
);

export const dynamic = 'force-dynamic';

// Loading fallback component for main content
const ReviewContentLoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
    <div className="text-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--main-5)] mx-auto mb-4"></div>
      <p className="text-[var(--main-5)]">리뷰 등록 페이지 로딩 중...</p>
    </div>
  </div>
);

export default function Page() {
  return (
    <BaseLayout header={<Header />} showBottomNav>
      <Suspense fallback={<ReviewContentLoadingFallback />}>
        <RegisterReviewContent />
      </Suspense>
    </BaseLayout>
  );
}
