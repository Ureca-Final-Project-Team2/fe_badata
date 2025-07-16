'use client';
import { BaseLayout } from '@components/layout/BaseLayout';
import { TradeCouponFilter } from '@features/trade/ui/TradeCouponFilter';
import { TradeCouponList } from '@features/trade/ui/TradeCouponList';
import { TradeFloatingButton } from '@features/trade/ui/TradeFloatingButton';
import { TradePageHeader } from '@features/trade/ui/TradePageHeader';
import { Header } from '@ui/Header';
import { useState } from 'react';

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
