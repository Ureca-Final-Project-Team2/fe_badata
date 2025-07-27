'use client';

import { useReducer, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useTradePostsQuery } from '@/entities/trade-post/model/queries';
import { DATA_SORT_OPTIONS } from '@/pages/trade/data/lib/constants';
import {
  dataFilterReducer,
  initialDataFilterState,
} from '@/pages/trade/data/model/dataFilterReducer';
import { useFilteredDataPostsHooks } from '@/pages/trade/data/model/useFilteredDataPostsHooks';
import { DataFilterDrawer } from '@/pages/trade/data/ui/DataFilterDrawer';
import { DataList } from '@/pages/trade/data/ui/DataList';
import { DataListFilter } from '@/pages/trade/data/ui/DataListFilter';
import { PATH } from '@/shared/config/path';
import { useSortStateHook } from '@/shared/model/useSortStateHook';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header } from '@/shared/ui/Header';
import { TradeFlatTab } from '@/widgets/trade/flat-tab/ui/TradeFlatTab';
import { TradeFloatingButton } from '@/widgets/trade/floating-button/ui/TradeFloatingButton';
import { TradeSearchInput } from '@/widgets/trade/search-input/ui/TradeSearchInput';
import { TradeSortFilter } from '@/widgets/trade/trade-sort-filter';

import type { AllPost } from '@/entities/trade-post/lib/types';
import type { DataSortOption } from '@/pages/trade/data/lib/constants';
import type { DataFilterState } from '@/pages/trade/data/model/dataFilterReducer';

export default function DataPage() {
  const router = useRouter();

  const {
    sortOption,
    setSortOption,
    isSortDrawerOpen,
    openDrawer: openSortDrawer,
    closeDrawer: closeSortDrawer,
  } = useSortStateHook<DataSortOption>('latest');

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [filterState, dispatchFilter] = useReducer(dataFilterReducer, initialDataFilterState);

  const { posts, isLoading } = useTradePostsQuery();

  const filteredPosts = useFilteredDataPostsHooks(posts, filterState, sortOption);

  const currentSortLabel = DATA_SORT_OPTIONS.find((o) => o.value === sortOption)?.label ?? '최신순';

  const handleItemClick = (item: AllPost) => {
    router.push(PATH.TRADE.DATA_DETAIL.replace(':id', String(item.id)));
  };

  const handleFilterSubmit = (filters: DataFilterState) => {
    dispatchFilter({ type: 'SET_ALL_FILTERS', payload: filters });
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
        <DataListFilter
          sortLabel={currentSortLabel}
          onSortClick={openSortDrawer}
          onFilterClick={() => setIsFilterDrawerOpen(true)}
        />
        <DataList items={filteredPosts} isLoading={isLoading} onItemClick={handleItemClick} />
      </BaseLayout>

      <TradeSortFilter
        isOpen={isSortDrawerOpen}
        onClose={closeSortDrawer}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />
      <DataFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filterState={filterState}
        dispatch={dispatchFilter}
        onSubmit={handleFilterSubmit}
      />
    </>
  );
}
