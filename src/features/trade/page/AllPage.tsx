'use client';

import { useAllTradePostsHooks } from '@/features/trade/model/useAllTradePostsHooks';
import { TradeDeadlineBanner } from '@/features/trade/ui/TradeDeadlineBanner';
import { TradeFlatTab } from '@/features/trade/ui/TradeFlatTab';
import { TradeList } from '@/features/trade/ui/TradeList';
import { TradeTrendingBanner } from '@/features/trade/ui/TradeTrendingBanner';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header } from '@/shared/ui/Header';
import { TradeFloatingButton } from '@/widgets/trade/floating-button/ui/TradeFloatingButton';
import { TradeSearchInput } from '@/widgets/trade/search-input/ui/TradeSearchInput';
import { TradeSortFilter } from '@/widgets/trade/trade-sort-filter';

export default function AllPage() {
  const {
    posts,
    isLoading,
    sortOption,
    sortHandlers: { openSortDrawer, closeSortDrawer, setSortOption, onItemClick, isSortDrawerOpen },
  } = useAllTradePostsHooks();

  return (
    <>
      <BaseLayout header={<Header />} showBottomNav fab={<TradeFloatingButton />} paddingX>
        <TradeFlatTab basePath="/trade" />
        <TradeSearchInput />
        <TradeDeadlineBanner />
        <TradeTrendingBanner />
        <TradeList
          items={posts}
          isLoading={isLoading}
          sortLabel={sortOption === 'latest' ? '최신순' : '인기순'}
          onSortClick={openSortDrawer}
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
