'use client';

import { TradeDeadlineBanner } from '@/pages/trade/ui/TradeDeadlineBanner';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header } from '@/shared/ui/Header';
import { TradeFlatTab } from '@/widgets/trade/flat-tab/ui/TradeFlatTab';
import { TradeFloatingButton } from '@/widgets/trade/floating-button/ui/TradeFloatingButton';
import { TradeSearchInput } from '@/widgets/trade/search-input/ui/TradeSearchInput';

export default function TradePage() {
  return (
    <BaseLayout header={<Header />} showBottomNav fab={<TradeFloatingButton />} paddingX>
      <TradeFlatTab />
      <TradeSearchInput />
      <TradeDeadlineBanner />
    </BaseLayout>
  );
}
