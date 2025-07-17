import { useState } from 'react';

import { TradeDataList } from '@/pages/trade/data/ui/TradeDataList';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header } from '@/shared/ui/Header';
import { TradeFlatTab } from '@/widgets/trade/flat-tab/ui/TradeFlatTab';
import { TradeFloatingButton } from '@/widgets/trade/floating-button/ui/TradeFloatingButton';
import { TradeSearchInput } from '@/widgets/trade/search-input/ui/TradeSearchInput';

export default function DataPage() {
  const [sortOption, setSortOption] = useState<'latest' | 'popular'>('latest');
  const [isSortDrawerOpen, setIsSortDrawerOpen] = useState(false);

  return (
    <BaseLayout
      header={<Header />}
      showBottomNav={!isSortDrawerOpen}
      className="px-0"
      fab={<TradeFloatingButton />}
    >
      <TradeFlatTab />
      <TradeSearchInput />
      <TradeDataList
        sortOption={sortOption}
        setSortOption={setSortOption}
        isSortDrawerOpen={isSortDrawerOpen}
        setIsSortDrawerOpen={setIsSortDrawerOpen}
      />
    </BaseLayout>
  );
}
