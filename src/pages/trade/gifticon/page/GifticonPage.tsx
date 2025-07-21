'use client';

import { useState } from 'react';

import { GifticonFilter } from '@/pages/trade/gifticon/ui/GifticonFilter';
import { GifticonList } from '@/pages/trade/gifticon/ui/GifticonList';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header } from '@/shared/ui/Header';
import { TradeFlatTab } from '@/widgets/trade/flat-tab/ui/TradeFlatTab';
import { TradeFloatingButton } from '@/widgets/trade/floating-button/ui/TradeFloatingButton';
import { TradeSearchInput } from '@/widgets/trade/search-input/ui/TradeSearchInput';
import { TradeSortFilter } from '@/widgets/trade/trade-sort-filter';
import { useTradeSortState } from '@/widgets/trade/trade-sort-filter/model/useTradeSortState';

export default function GifticonPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const { sortOption, setSortOption, isSortDrawerOpen, openDrawer, closeDrawer } =
    useTradeSortState();

  return (
    <>
      <BaseLayout
        header={<Header />}
        showBottomNav={!isSortDrawerOpen}
        fab={<TradeFloatingButton />}
      >
        <TradeFlatTab />
        <TradeSearchInput />
        <GifticonFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <GifticonList
          sortOption={sortOption}
          onSortClick={openDrawer}
          selectedCategory={selectedCategory}
        />
      </BaseLayout>
      <TradeSortFilter
        isOpen={isSortDrawerOpen}
        onClose={closeDrawer}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />
    </>
  );
}
