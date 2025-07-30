import { Suspense } from 'react';

import GifticonPageClient from '@/features/trade/gifticon/_client/GifticonPageClient';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header } from '@/shared/ui/Header';
import { TradeFloatingButton } from '@/widgets/trade/floating-button/ui/TradeFloatingButton';

export default function GifticonPage() {
  return (
    <BaseLayout header={<Header />} showBottomNav fab={<TradeFloatingButton />} paddingX>
      <Suspense fallback={<div>기프티콘 게시물을 불러오는 중입니다...</div>}>
        <GifticonPageClient />
      </Suspense>
    </BaseLayout>
  );
}
