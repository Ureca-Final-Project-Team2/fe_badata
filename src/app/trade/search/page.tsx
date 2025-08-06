'use client';

import { lazy, Suspense } from 'react';

import { useRouter } from 'next/navigation';

import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';

const TradeSearchContent = lazy(() => import('@/features/trade/search-post/page/SearchTradePage'));

export const dynamic = 'force-dynamic';

// Loading fallback component for main content
const SearchContentLoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
    <div className="text-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--main-5)] mx-auto mb-4"></div>
      <p className="text-[var(--main-5)]">검색 페이지 로딩 중...</p>
    </div>
  </div>
);

export default function SearchPage() {
  const router = useRouter();

  const handleBack = () => router.back();

  return (
    <BaseLayout
      header={<PageHeader title="검색" onBack={handleBack} variant="default" />}
      showBottomNav={true}
      showSos={true}
    >
      <Suspense fallback={<SearchContentLoadingFallback />}>
        <TradeSearchContent />
      </Suspense>
    </BaseLayout>
  );
}
