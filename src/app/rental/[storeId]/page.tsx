import { lazy, Suspense } from 'react';

import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header_Detail } from '@/shared/ui/Header_Detail/Header_Detail';

const StoreDetailContent = lazy(
  () => import('@/features/rental/store/store-detail/page/StoreDetailPage'),
);

interface PageProps {
  params: Promise<{
    storeId: string;
  }>;
}

// Loading fallback component for main content
const StoreDetailContentLoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
    <div className="text-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--main-5)] mx-auto mb-4">
        <p className="text-[var(--main-5)]">가맹점 상세 페이지 로딩 중...</p>
      </div>
    </div>
  </div>
);

export default async function Page({ params }: PageProps) {
  const { storeId } = await params;

  const numericStoreId = Number(storeId);
  if (isNaN(numericStoreId) || numericStoreId <= 0) {
    throw new Error('Invalid store ID');
  }

  return (
    <BaseLayout header={<Header_Detail title="가맹점 상세" />} showBottomNav>
      <Suspense fallback={<StoreDetailContentLoadingFallback />}>
        <StoreDetailContent storeId={numericStoreId} />
      </Suspense>
    </BaseLayout>
  );
}
