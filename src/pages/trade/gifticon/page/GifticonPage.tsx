'use client';

import { useState } from 'react';

import { GifticonFilter } from '@/pages/trade/gifticon/ui/GifticonFilter';
import { GifticonList } from '@/pages/trade/gifticon/ui/GifticonList';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header } from '@/shared/ui/Header';
import { TradeFlatTab } from '@/widgets/trade/flat-tab/ui/TradeFlatTab';
import { TradeFloatingButton } from '@/widgets/trade/floating-button/ui/TradeFloatingButton';
import { TradeSearchInput } from '@/widgets/trade/search-input/ui/TradeSearchInput';

export default function GifticonPage() {
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
      <TradeFlatTab />
      <TradeSearchInput />
      <GifticonFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      <GifticonList
        sortOption={sortOption}
        setSortOption={setSortOption}
        isSortDrawerOpen={isSortDrawerOpen}
        setIsSortDrawerOpen={setIsSortDrawerOpen}
        selectedCategory={selectedCategory}
      />
    </BaseLayout>
  );
}
