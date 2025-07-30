'use client';

import { useSearchParams } from 'next/navigation';

import { TradeDeadlineBanner } from '@/features/trade/ui/TradeDeadlineBanner';
import { TradeFlatTab } from '@/features/trade/ui/TradeFlatTab';
import { TradeList } from '@/features/trade/ui/TradeList';
import { TradeTrendingBanner } from '@/features/trade/ui/TradeTrendingBanner';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header } from '@/shared/ui/Header';
import { TradeFloatingButton } from '@/widgets/trade/floating-button/ui/TradeFloatingButton';
import { TradeSearchInput } from '@/widgets/trade/search-input/ui/TradeSearchInput';
import { TradeSortFilter } from '@/widgets/trade/trade-sort-filter';

import { DataFilterDrawer } from '../data/ui/DataFilterDrawer';
import { GifticonFilterDrawer } from '../gifticon/ui/GifticonFilterDrawer';
import { useDataFilterHooks } from '../model/useDataFilterHooks';
import { useFilteredTradePostsHooks } from '../model/useFilteredTradePostsHooks';
import { useGifticonFilterHooks } from '../model/useGifticonFilterHooks';

export default function TradePage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams?.get('page') ?? 'all';

  const {
    filteredPosts,
    isLoading,
    sortOption,
    sortHandlers: { openSortDrawer, closeSortDrawer, setSortOption, onItemClick, isSortDrawerOpen },
  } = useFilteredTradePostsHooks(currentTab);

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

  const handleSortClick = () => {
    openSortDrawer();
  };

  const handleFilterClick = () => {
    if (currentTab === 'data') openDataDrawer();
    else if (currentTab === 'gifticon') openGifticonDrawer();
  };

  return (
    <>
      <BaseLayout header={<Header />} showBottomNav fab={<TradeFloatingButton />} paddingX>
        <TradeFlatTab />
        <TradeSearchInput />
        {currentTab === 'all' && (
          <>
            <TradeDeadlineBanner />
            <TradeTrendingBanner />
          </>
        )}

        <TradeList
          items={filteredPosts}
          isLoading={isLoading}
          sortLabel={sortOption === 'latest' ? '최신순' : '인기순'}
          onSortClick={handleSortClick}
          onFilterClick={['data', 'gifticon'].includes(currentTab) ? handleFilterClick : undefined}
          onItemClick={onItemClick}
        />
      </BaseLayout>

      <TradeSortFilter
        isOpen={isSortDrawerOpen}
        onClose={closeSortDrawer}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      {currentTab === 'data' && (
        <DataFilterDrawer
          isOpen={dataDrawerOpen}
          onClose={closeDataDrawer}
          filterState={dataFilterState}
          dispatch={dataDispatch}
          onSubmit={submitDataFilter}
        />
      )}

      {currentTab === 'gifticon' && (
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
