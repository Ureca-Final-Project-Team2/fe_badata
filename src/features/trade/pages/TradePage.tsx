'use client';

import { useState } from 'react';
import { BaseLayout } from '@components/layout/BaseLayout';
import { Header } from '@ui/Header';
import { TradePageHeader } from '@features/trade/components/TradePageHeader';
import { TradeMainBanner } from '@features/trade/components/TradeMainBanner';
import { TradeMainList } from '@features/trade/components/TradeMainList';

export default function TradePage() {
  const [isSortDrawerOpen, setIsSortDrawerOpen] = useState(false);

  return (
    <BaseLayout header={<Header />} className="px-0" showBottomNav={!isSortDrawerOpen}>
      <TradePageHeader />
      <TradeMainBanner />
      <TradeMainList
        isSortDrawerOpen={isSortDrawerOpen}
        setIsSortDrawerOpen={setIsSortDrawerOpen}
      />
    </BaseLayout>
  );
}
