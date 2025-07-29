import { Suspense } from 'react';

import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';

import DeadlinePageClient from '../_client/DeadlinePageClient';

export default function DeadlinePage() {
  return (
    <BaseLayout header={<PageHeader title="마감 임박 게시물" onBack={() => history.back()} />}>
      <Suspense fallback={<div>마감 임박 게시물을 불러오는 중입니다...</div>}>
        <DeadlinePageClient />
      </Suspense>
    </BaseLayout>
  );
}
