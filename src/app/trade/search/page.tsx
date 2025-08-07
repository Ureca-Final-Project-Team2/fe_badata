'use client';

import { lazy, Suspense } from 'react';

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
  return (
    <Suspense fallback={<SearchContentLoadingFallback />}>
      <TradeSearchContent />
    </Suspense>
  );
}
