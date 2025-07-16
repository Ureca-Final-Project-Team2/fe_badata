'use client';

import { BaseLayout } from '@components/layout/BaseLayout';
import { TradeDeadlineBanner } from '@features/trade/ui/banner/TradeDeadlineBanner';
import { TradeFloatingButton } from '@features/trade/ui/TradeFloatingButton';
import { TradePageHeader } from '@features/trade/ui/TradePageHeader';
import { Header } from '@ui/Header';

export default function TradeMainPage() {
  return (
    <BaseLayout header={<Header />} className="px-0" showBottomNav fab={<TradeFloatingButton />}>
      <TradePageHeader />
      <TradeDeadlineBanner />
    </BaseLayout>
  );
}
