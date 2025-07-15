'use client';

import { useSearchTradePostsQuery } from '@features/trade/model/useTradeQueries';
import { SearchHeader } from '@features/trade/ui/search/SearchHeader';
import { SearchHotKeywords } from '@features/trade/ui/search/SearchHotKeywords';
import { SearchRecentKeywords } from '@features/trade/ui/search/SearchRecentKeywords';
import { SearchResult } from '@features/trade/ui/search/SearchResult';
import { BaseLayout } from '@shared/components/layout/BaseLayout';
import { useDebouncedValue } from '@shared/hooks/useDebounceValue';
import { PageHeader } from '@ui/Header/PageHeader';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function TradeSearchPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 300);

  const { data: posts, isLoading, isError } = useSearchTradePostsQuery(debouncedSearch);

  const recentKeywords = ['데이터', '200MB', '유플러스', '메가커피', '스타벅스'];
  const hotKeywords = ['공유 데이터', '영화관 할인쿠폰', '데이터 1GB', '스타벅스 아메리카노'];

  const handleBack = () => router.back();

  return (
    <BaseLayout
      header={<PageHeader title="검색" onBack={handleBack} variant="default" />}
      showBottomNav={true}
      showSos={true}
    >
      <SearchHeader search={search} setSearch={setSearch} />
      <SearchRecentKeywords keywords={recentKeywords} />
      <SearchHotKeywords keywords={hotKeywords} />
      <SearchResult search={debouncedSearch} posts={posts} isLoading={isLoading} isError={isError} />
    </BaseLayout>
  );
}
