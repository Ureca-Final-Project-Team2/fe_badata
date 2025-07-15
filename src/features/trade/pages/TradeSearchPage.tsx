'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BaseLayout } from '@shared/components/layout/BaseLayout';
import { PageHeader } from '@ui/Header/PageHeader';
import { SearchHeader } from '@features/trade/components/search/SearchHeader';
import { SearchRecentKeywords } from '@features/trade/components/search/SearchRecentKeywords';
import { SearchHotKeywords } from '@features/trade/components/search/SearchHotKeywords';
import { SearchResult } from '@features/trade/components/search/SearchResult';

export function TradeSearchPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const recentKeywords = ['200MB', '유플러스', '메가커피', '스타벅스'];
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
      <SearchResult search={search} />
    </BaseLayout>
  );
}
