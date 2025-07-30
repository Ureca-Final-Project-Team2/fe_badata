'use client';

import { useRouter } from 'next/navigation';

import { useTradePostsQuery } from '@/entities/trade-post/model/queries';
import { DataFilterDrawer } from '@/features/trade/data/ui/DataFilterDrawer';
import { useDataFilterHooks } from '@/features/trade/model/useDataFilterHooks';
import { TradeList } from '@/features/trade/ui/TradeList';
import { PATH } from '@/shared/config/path';
import { useSortStateHook } from '@/shared/model/useSortStateHook';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header } from '@/shared/ui/Header';
import { TradeFlatTab } from '@/widgets/trade/flat-tab/ui/TradeFlatTab';
import { TradeFloatingButton } from '@/widgets/trade/floating-button/ui/TradeFloatingButton';
import { TradeSearchInput } from '@/widgets/trade/search-input/ui/TradeSearchInput';
import { TradeSortFilter } from '@/widgets/trade/trade-sort-filter';

export default function DataPage() {
  const router = useRouter();

  const { posts, isLoading } = useTradePostsQuery();
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

  const filteredPosts = (posts ?? [])
    .filter((p) => {
      const { carriers, capacities, priceRange } = dataFilterState;
      return (
        p.postCategory === 'DATA' &&
        (carriers.length === 0 || (p.mobileCarrier && carriers.includes(p.mobileCarrier))) &&
        (capacities.length === 0 || capacities.includes(p.capacity?.toString() ?? '')) &&
        (!priceRange || p.price <= Number(priceRange))
      );
    })
    .sort((a, b) =>
      sortOption === 'latest'
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : b.likesCount - a.likesCount,
    );

  const handleCardClick = (item: (typeof filteredPosts)[number]) => {
    router.push(PATH.TRADE.DATA_DETAIL.replace(':id', String(item.id)));
  };

  return (
    <>
      <BaseLayout
        header={<Header />}
        showBottomNav={!isSortDrawerOpen}
        fab={<TradeFloatingButton />}
      >
        <TradeFlatTab basePath="/trade" />
        <TradeSearchInput />
        <TradeList
          items={filteredPosts}
          isLoading={isLoading}
          sortLabel={sortOption === 'latest' ? '최신순' : '인기순'}
          onSortClick={openDrawer}
          onFilterClick={openDataDrawer}
          onItemClick={handleCardClick}
        />
      </BaseLayout>

      <TradeSortFilter
        isOpen={isSortDrawerOpen}
        onClose={closeDrawer}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />
      <DataFilterDrawer
        isOpen={dataDrawerOpen}
        onClose={closeDataDrawer}
        filterState={dataFilterState}
        dispatch={dataDispatch}
        onSubmit={submitDataFilter}
      />
    </>
  );
}
