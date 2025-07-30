import { Suspense } from 'react';

import TradePageClient from '@/features/trade/_client/TradePageClient';

export default function Page() {
  return (
    <Suspense fallback={<div>게시물을 불러오는 중입니다...</div>}>
      <TradePageClient />
    </Suspense>
  );
}
