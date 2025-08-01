import { Suspense } from 'react';

import DeadlinePageClient from '@/features/trade/deadline/_client/DeadlinePageClient';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeaderWithBack } from '@/shared/ui/Header/PageHeaderWithBack';

export default function DeadlinePage() {
  return (
    <BaseLayout header={<PageHeaderWithBack title="마감 임박 게시물" />}>
      <Suspense fallback={<div>마감 임박 게시물을 불러오는 중입니다...</div>}>
        <DeadlinePageClient />
      </Suspense>
    </BaseLayout>
  );
}
