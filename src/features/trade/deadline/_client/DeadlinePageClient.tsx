'use client';

import { useEffect, useRef, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useInView } from 'framer-motion';

import { DataFilterDrawer } from '@/features/trade/data/ui/DataFilterDrawer';
import { DeadlineFlatTab } from '@/features/trade/deadline/ui/DeadlineFlatTab';
import { DeadlineList } from '@/features/trade/deadline/ui/DeadlineList';
import { GifticonFilterDrawer } from '@/features/trade/gifticon/ui/GifticonFilterDrawer';
import { useTradeDeadlineInfiniteQuery } from '@/features/trade/model/queries';
import { useDataFilterHooks } from '@/features/trade/model/useDataFilterHooks';
import { useGifticonFilterHooks } from '@/features/trade/model/useGifticonFilterHooks';
import { PATH } from '@/shared/config/path';
import { useSortStateHook } from '@/shared/model/useSortStateHook';
import { TradeSortFilter } from '@/widgets/trade/trade-sort-filter';

import { GifticonFilter } from '../../gifticon/ui/GifticonFilter';

import type { DeadlinePost } from '@/entities/trade-post/lib/types';

const SORT_OPTIONS = [
  { value: 'latest', label: '최신순' },
  { value: 'popular', label: '인기순' },
] as const;

export default function DeadlinePageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') ?? 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useTradeDeadlineInfiniteQuery();

  const allPosts = data.pages.flatMap((page) => page.item);

  const { sortOption, setSortOption, isSortDrawerOpen, openDrawer, closeDrawer } = useSortStateHook<
    'latest' | 'popular'
  >('latest');

  const {
    dataFilterState,
    dataDispatch,
    dataDrawerOpen,
    openDataDrawer,
    closeDataDrawer,
    submitDataFilter,
  } = useDataFilterHooks();

  const {
    gifticonPrice,
    setGifticonPrice,
    gifticonDrawerOpen,
    openGifticonDrawer,
    closeGifticonDrawer,
    submitGifticonFilter,
  } = useGifticonFilterHooks();

  const filteredPosts = allPosts
    .filter((p) => {
      if (page === 'all') return true;
      if (page === 'data') {
        const { carriers, capacities, priceRange } = dataFilterState;
        return (
          p.postCategory === 'DATA' &&
          (carriers.length === 0 || (p.mobileCarrier && carriers.includes(p.mobileCarrier))) &&
          (capacities.length === 0 ||
            (p.capacity !== undefined && capacities.includes(p.capacity.toString()))) &&
          (!priceRange || p.price <= Number(priceRange))
        );
      }

      if (page === 'gifticon') {
        return (
          p.postCategory === 'GIFTICON' &&
          (selectedCategory === '전체' || p.gifticonCategory === selectedCategory) &&
          p.price <= gifticonPrice
        );
      }
      return false;
    })
    .sort((a, b) => {
      return sortOption === 'latest'
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : b.likesCount - a.likesCount;
    });

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sortOption)?.label ?? '최신순';

  const loadMoreRef = useRef(null);
  const isInView = useInView(loadMoreRef);

  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleCardClick = (item: DeadlinePost) => {
    const path =
      item.postCategory === 'DATA'
        ? PATH.TRADE.DATA_DETAIL.replace(':id', String(item.id))
        : PATH.TRADE.GIFTICON_DETAIL.replace(':id', String(item.id));
    router.push(path);
  };

  return (
    <>
      <DeadlineFlatTab className="my-4" />
      {page === 'gifticon' && (
        <GifticonFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}
      <DeadlineList
        items={filteredPosts}
        isLoading={isLoading}
        sortLabel={currentSortLabel}
        onSortClick={openDrawer}
        onItemClick={handleCardClick}
        onFilterClick={
          page === 'data' ? openDataDrawer : page === 'gifticon' ? openGifticonDrawer : undefined
        }
      />
      <TradeSortFilter
        isOpen={isSortDrawerOpen}
        onClose={closeDrawer}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      {page === 'data' && (
        <DataFilterDrawer
          isOpen={dataDrawerOpen}
          onClose={closeDataDrawer}
          filterState={dataFilterState}
          dispatch={dataDispatch}
          onSubmit={submitDataFilter}
        />
      )}

      {page === 'gifticon' && (
        <GifticonFilterDrawer
          isOpen={gifticonDrawerOpen}
          onClose={closeGifticonDrawer}
          maxPrice={gifticonPrice}
          onPriceChange={setGifticonPrice}
          onSubmit={submitGifticonFilter}
          onReset={() => setGifticonPrice(50000)}
        />
      )}
    </>
  );
}
