import { Suspense } from 'react';

import AllPageClient from '@/features/trade/all/_client/AllPageClient';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header } from '@/shared/ui/Header';
import { TradeFloatingButton } from '@/widgets/trade/floating-button/ui/TradeFloatingButton';

export default function AllPage() {
  return (
    <BaseLayout header={<Header />} showBottomNav fab={<TradeFloatingButton />} paddingX>
      <Suspense fallback={<div>게시물을 불러오는 중입니다...</div>}>
        <AllPageClient />
      </Suspense>
    </BaseLayout>
  );
}
