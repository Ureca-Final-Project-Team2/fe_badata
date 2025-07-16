import { useState } from 'react';

import { BaseLayout } from '@components/layout/BaseLayout';
import { TradeDataList } from '@features/trade/ui/TradeDataList';
import { TradeFloatingButton } from '@features/trade/ui/TradeFloatingButton';
import { TradePageHeader } from '@features/trade/ui/TradePageHeader';
import { Header } from '@ui/Header';

export default function TradeDataPage() {
  const [sortOption, setSortOption] = useState<'latest' | 'popular'>('latest');
  const [isSortDrawerOpen, setIsSortDrawerOpen] = useState(false);

  return (
    <BaseLayout
      header={<Header />}
      showBottomNav={!isSortDrawerOpen}
      className="px-0"
      fab={<TradeFloatingButton />}
    >
      <TradePageHeader />
      <TradeDataList
        sortOption={sortOption}
        setSortOption={setSortOption}
        isSortDrawerOpen={isSortDrawerOpen}
        setIsSortDrawerOpen={setIsSortDrawerOpen}
      />
    </BaseLayout>
  );
}
