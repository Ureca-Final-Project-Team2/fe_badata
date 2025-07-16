import { useState } from 'react';
import { BaseLayout } from '@components/layout/BaseLayout';
import { Header } from '@ui/Header';
import { TradePageHeader } from '@features/trade/ui/TradePageHeader';
import { TradeCouponList } from '@features/trade/ui/TradeCouponList';
import { TradeCouponFilter } from '@features/trade/ui/TradeCouponFilter';
import { TradeFloatingButton } from '@features/trade/ui/TradeFloatingButton';

export default function TradeCouponPage() {
  const [sortOption, setSortOption] = useState<'latest' | 'popular'>('latest');
  const [isSortDrawerOpen, setIsSortDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  return (
    <BaseLayout
      header={<Header />}
      showBottomNav={!isSortDrawerOpen}
      className="px-0"
      fab={<TradeFloatingButton />}
    >
      <TradePageHeader />
      <TradeCouponFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <TradeCouponList
        sortOption={sortOption}
        setSortOption={setSortOption}
        isSortDrawerOpen={isSortDrawerOpen}
        setIsSortDrawerOpen={setIsSortDrawerOpen}
        selectedCategory={selectedCategory}
      />
    </BaseLayout>
  );
}
