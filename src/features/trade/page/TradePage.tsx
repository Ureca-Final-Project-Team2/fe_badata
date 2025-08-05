import { Suspense } from 'react';

import TradePageClient from '@/features/trade/_client/TradePageClient';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header } from '@/shared/ui/Header';
import { TradeFloatingButton } from '@/widgets/trade/floating-button/ui/TradeFloatingButton';

export default function Page() {
  return (
    <BaseLayout header={<Header />} showBottomNav fab={<TradeFloatingButton />} paddingX>
      <Suspense fallback={<div>게시물을 불러오는 중입니다...</div>}>
        <TradePageClient />
      </Suspense>
    </BaseLayout>
  );
}
