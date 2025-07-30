'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { PATH } from '@/shared/config/path';
import { useSortStateHook } from '@/shared/model/useSortStateHook';
import { TradeSortFilter } from '@/widgets/trade/trade-sort-filter';

import { DataFilterDrawer } from '../../data/ui/DataFilterDrawer';
import { GifticonFilterDrawer } from '../../gifticon/ui/GifticonFilterDrawer';
import { useTradeTrendingQuery } from '../../model/queries';
import { useDataFilterHooks } from '../../model/useDataFilterHooks';
import { useGifticonFilterHooks } from '../../model/useGifticonFilterHooks';
import { TrendingFlatTab } from '../ui/TrendingFlatTab';
import { TrendingList } from '../ui/TrendingList';

import type { DeadlinePost as PostItem } from '@/entities/trade-post/lib/types';

const SORT_OPTIONS = [
  { value: 'latest', label: '최신순' },
  { value: 'popular', label: '인기순' },
] as const;

export default function TrendingPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') ?? 'all';

  const { trendingPosts: posts, isLoading } = useTradeTrendingQuery();
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

  const filteredPosts = (posts ?? [])
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
        return p.postCategory === 'GIFTICON' && p.price <= gifticonPrice;
      }
      return false;
    })
    .sort((a, b) => {
      return sortOption === 'latest'
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : b.likesCount - a.likesCount;
    });

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sortOption)?.label ?? '최신순';

  const handleCardClick = (item: PostItem) => {
    const path =
      item.postCategory === 'DATA'
        ? PATH.TRADE.DATA_DETAIL.replace(':id', String(item.id))
        : PATH.TRADE.GIFTICON_DETAIL.replace(':id', String(item.id));
    router.push(path);
  };

  return (
    <>
      <TrendingFlatTab className="my-4" />
      <TrendingList
        items={filteredPosts}
        isLoading={isLoading}
        sortLabel={currentSortLabel}
        onSortClick={openDrawer}
        onFilterClick={
          page === 'data' ? openDataDrawer : page === 'gifticon' ? openGifticonDrawer : undefined
        }
        onItemClick={handleCardClick}
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
