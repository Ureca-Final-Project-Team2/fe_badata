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

import { useAllTradePostsHooks } from '../model/useAllTradePostsHooks';

export default function TradePage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams?.get('page') ?? 'all';

  const {
    posts,
    isLoading,
    sortOption,
    sortHandlers: { openSortDrawer, closeSortDrawer, setSortOption, onItemClick, isSortDrawerOpen },
  } = useAllTradePostsHooks();

  const handleSortClick = () => {
    openSortDrawer();
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
          items={posts}
          isLoading={isLoading}
          sortLabel={sortOption === 'latest' ? '최신순' : '인기순'}
          onSortClick={handleSortClick}
          onItemClick={onItemClick}
        />
      </BaseLayout>

      <TradeSortFilter
        isOpen={isSortDrawerOpen}
        onClose={closeSortDrawer}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />
    </>
  );
}
