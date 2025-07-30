'use client';

import { useSearchParams } from 'next/navigation';

import { useFilteredTradePosts } from '@/features/trade/model/useFilteredTradePosts';
import { TradeDeadlineBanner } from '@/features/trade/ui/TradeDeadlineBanner';
import { TradeFlatTab } from '@/features/trade/ui/TradeFlatTab';
import { TradeList } from '@/features/trade/ui/TradeList';
import { TradeTrendingBanner } from '@/features/trade/ui/TradeTrendingBanner';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header } from '@/shared/ui/Header';
import { TradeFloatingButton } from '@/widgets/trade/floating-button/ui/TradeFloatingButton';
import { TradeSearchInput } from '@/widgets/trade/search-input/ui/TradeSearchInput';

export default function TradePage() {
  const searchParams = useSearchParams();
  const currentTab = searchParams?.get('page') ?? 'all';

  const { filteredPosts, isLoading, sortOption, sortHandlers } = useFilteredTradePosts(currentTab);
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
          onSortClick={sortHandlers.openDrawer}
          onItemClick={sortHandlers.onItemClick}
        />
      </BaseLayout>
    </>
  );
}
