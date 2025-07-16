'use client';

import { CouponPost, DataPost } from '@features/trade/lib/types';
import { useRecentSearch } from '@features/trade/model/useRecentSearch';
import { useSearchTradePostsQuery } from '@features/trade/model/useTradeQueries';
import { SearchHeader } from '@features/trade/ui/search/SearchHeader';
import { SearchHotKeywords } from '@features/trade/ui/search/SearchHotKeywords';
import { SearchRecentKeywords } from '@features/trade/ui/search/SearchRecentKeywords';
import { SearchResult } from '@features/trade/ui/search/SearchResult';
import { BaseLayout } from '@shared/components/layout/BaseLayout';
import { useDebouncedValue } from '@shared/hooks/useDebounceValue';
import { PageHeader } from '@ui/Header/PageHeader';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

export function TradeSearchPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 300);

  const { data: posts, isLoading, isError } = useSearchTradePostsQuery(debouncedSearch);

  const { keywords: recentKeywords, add, remove, clear } = useRecentSearch();

  const hotKeywords = ['공유 데이터', '영화관 할인쿠폰', '데이터 1GB', '스타벅스 아메리카노'];

  const handleBack = useCallback(() => router.back(), [router]);

  const handleSearchSubmit = useCallback((keyword: string) => {
  const trimmed = keyword.trim();
  if (!trimmed) return;
  setSearch(trimmed);
  add(trimmed);
}, [add]);

  return (
    <BaseLayout
      header={<PageHeader title="검색" onBack={handleBack} variant="default" />}
      showBottomNav={true}
      showSos={true}
    >
      <SearchHeader search={search} setSearch={setSearch} onSubmit={handleSearchSubmit} />
      <SearchRecentKeywords
        keywords={recentKeywords}
        onDeleteKeyword={remove}
        onDeleteAll={clear}
        onClickKeyword={handleSearchSubmit}
      />
      <SearchHotKeywords keywords={hotKeywords} />
      <SearchResult search={debouncedSearch} posts={posts as DataPost[] | CouponPost[]} isLoading={isLoading} isError={isError} />
    </BaseLayout>
  );
}
