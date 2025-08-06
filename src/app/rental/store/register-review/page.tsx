import { lazy, Suspense } from 'react';

const RegisterReviewPage = lazy(
  () => import('@/features/rental/store/register-review/page/RegisterReviewPage'),
);

export const dynamic = 'force-dynamic';

// Loading fallback component
const ReviewLoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-gray-500">리뷰 등록 페이지 로딩 중...</div>
  </div>
);

export default function Page() {
  return (
    <Suspense fallback={<ReviewLoadingFallback />}>
      <RegisterReviewPage />
    </Suspense>
  );
}
