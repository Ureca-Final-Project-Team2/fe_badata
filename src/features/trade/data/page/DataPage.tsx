import { Suspense } from 'react';

import DataPageClient from '@/features/trade/data/_client/DataPageClient';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header } from '@/shared/ui/Header';
import { TradeFloatingButton } from '@/widgets/trade/floating-button/ui/TradeFloatingButton';

export default function DataPage() {
  return (
    <BaseLayout header={<Header />} showBottomNav fab={<TradeFloatingButton />} paddingX>
      <Suspense fallback={<div>데이터 게시물을 불러오는 중입니다...</div>}>
        <DataPageClient />
      </Suspense>
    </BaseLayout>
  );
}
