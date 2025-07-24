'use client';

import { useMemo } from 'react';

import { useRouter } from 'next/navigation';

import { useTradePostsQuery } from '@/entities/trade-post/model/queries';
import { DataList } from '@/pages/trade/data/ui/DataList';
import { PATH } from '@/shared/config/path';
import { useSortStateHook } from '@/shared/model/useSortStateHook';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header } from '@/shared/ui/Header';
import { TradeFlatTab } from '@/widgets/trade/flat-tab/ui/TradeFlatTab';
import { TradeFloatingButton } from '@/widgets/trade/floating-button/ui/TradeFloatingButton';
import { TradeSearchInput } from '@/widgets/trade/search-input/ui/TradeSearchInput';
import { TradeSortFilter } from '@/widgets/trade/trade-sort-filter';

import type { AllPost } from '@/entities/trade-post/lib/types';

const SORT_OPTIONS = [
  { value: 'latest', label: '최신순' },
  { value: 'popular', label: '인기순' },
];

export default function DataPage() {
  const router = useRouter();

  const { sortOption, setSortOption, isSortDrawerOpen, openDrawer, closeDrawer } = useSortStateHook<
    'latest' | 'popular'
  >('latest');

  const { posts, isLoading } = useTradePostsQuery();

  const processedPosts = useMemo(() => {
    if (!posts) return [];

    const dataPosts = posts.filter((p) => p.postCategory === 'DATA');

    return [...dataPosts].sort((a, b) =>
      sortOption === 'latest'
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : b.likesCount - a.likesCount,
    );
  }, [posts, sortOption]);

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sortOption)?.label ?? '최신순';

  const handleItemClick = (item: AllPost) => {
    router.push(PATH.TRADE.DATA_DETAIL.replace(':id', String(item.id)));
  };

  return (
    <>
      <BaseLayout
        header={<Header />}
        showBottomNav={!isSortDrawerOpen}
        fab={<TradeFloatingButton />}
      >
        <TradeFlatTab />
        <TradeSearchInput />
        <DataList
          items={processedPosts}
          isLoading={isLoading}
          sortLabel={currentSortLabel}
          onSortClick={openDrawer}
          onItemClick={handleItemClick}
        />
      </BaseLayout>
      <TradeSortFilter
        isOpen={isSortDrawerOpen}
        onClose={closeDrawer}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />
    </>
  );
}
