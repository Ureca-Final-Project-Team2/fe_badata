'use client';

import { useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useSearchTradePostsQuery } from '@/pages/trade/search-post/model/queries';
import { useRecentSearchHooks } from '@/pages/trade/search-post/model/useRecentSearchHooks';
import { SearchHeader } from '@/pages/trade/search-post/ui/SearchHeader';
import { SearchHotKeywords } from '@/pages/trade/search-post/ui/SearchHotKeywords';
import { SearchRecentKeywords } from '@/pages/trade/search-post/ui/SearchRecentKeywords';
import { SearchResult } from '@/pages/trade/search-post/ui/SearchResult';
import { useDebouncedValueHooks } from '@/shared/model/useDebounceValueHooks';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';

import type { CouponPost, DataPost } from '@/entities/trade-post/lib/types';

export function TradeSearchPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValueHooks(search, 300);

  const { data: posts, isLoading, isError } = useSearchTradePostsQuery(debouncedSearch);

  const { keywords: recentKeywords, add, remove, clear } = useRecentSearchHooks();

  const hotKeywords = ['공유 데이터', '영화관 할인쿠폰', '데이터 1GB', '스타벅스 아메리카노'];

  const handleBack = useCallback(() => router.back(), [router]);

  const handleSearchSubmit = useCallback(
    (keyword: string) => {
      const trimmed = keyword.trim();
      if (!trimmed) return;
      setSearch(trimmed);
      add(trimmed);
    },
    [add],
  );

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
      <SearchResult
        search={debouncedSearch}
        posts={posts as DataPost[] | CouponPost[]}
        isLoading={isLoading}
        isError={isError}
      />
    </BaseLayout>
  );
}
