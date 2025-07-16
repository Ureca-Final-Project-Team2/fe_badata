'use client';

import { BaseLayout } from '@components/layout/BaseLayout';
import { Header } from '@ui/Header';
import { TradePageHeader } from '@features/trade/ui/TradePageHeader';
import { TradeDeadlineBanner } from '@features/trade/ui/banner/TradeDeadlineBanner';
import { TradeFloatingButton } from '@features/trade/ui/TradeFloatingButton';

export default function TradeMainPage() {
  return (
    <BaseLayout header={<Header />} className="px-0" showBottomNav fab={<TradeFloatingButton />}>
      <TradePageHeader />
      <TradeDeadlineBanner />
    </BaseLayout>
  );
}
