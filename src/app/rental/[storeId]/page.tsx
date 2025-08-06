import { lazy, Suspense } from 'react';

const StoreDetailPage = lazy(
  () => import('@/features/rental/store/store-detail/page/StoreDetailPage'),
);

interface PageProps {
  params: Promise<{
    storeId: string;
  }>;
}

// Loading fallback component
const StoreDetailLoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-gray-500">가맹점 상세 페이지 로딩 중...</div>
  </div>
);

export default async function Page({ params }: PageProps) {
  const { storeId } = await params;

  const numericStoreId = Number(storeId);
  if (isNaN(numericStoreId) || numericStoreId <= 0) {
    throw new Error('Invalid store ID');
  }

  return (
    <Suspense fallback={<StoreDetailLoadingFallback />}>
      <StoreDetailPage storeId={numericStoreId} />
    </Suspense>
  );
}
