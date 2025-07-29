'use client';

import { useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useSearchTradePostsQuery } from '@/features/trade/search-post/model/queries';
import { useRecentSearchHooks } from '@/features/trade/search-post/model/useRecentSearchHooks';
import { SearchHeader } from '@/features/trade/search-post/ui/SearchHeader';
import { SearchHotKeywords } from '@/features/trade/search-post/ui/SearchHotKeywords';
import { SearchRecentKeywords } from '@/features/trade/search-post/ui/SearchRecentKeywords';
import { SearchResult } from '@/features/trade/search-post/ui/SearchResult';
import { useDebouncedValueHooks } from '@/shared/model/useDebounceValueHooks';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';

import type { DataPost, GifticonPost } from '@/entities/trade-post/lib/types';

export default function TradeSearchPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValueHooks(search, 300);

  const { data: posts, isLoading, isError } = useSearchTradePostsQuery(debouncedSearch);

  const {
    keywords: recentKeywords,
    isLoading: isRecentKeywordsLoading,
    add,
    remove,
    clear,
  } = useRecentSearchHooks();

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
        isLoading={isRecentKeywordsLoading}
      />
      <SearchHotKeywords onKeywordClick={handleSearchSubmit} />
      <SearchResult
        search={debouncedSearch}
        posts={posts as DataPost[] | GifticonPost[]}
        isLoading={isLoading}
        isError={isError}
      />
    </BaseLayout>
  );
}
