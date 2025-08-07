'use client';
import { Suspense } from 'react';

import { useRouter } from 'next/navigation';

import DeadlinePageClient from '@/features/trade/deadline/_client/DeadlinePageClient';
import { PATH } from '@/shared/config/path';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';

export default function DeadlinePage() {
  const router = useRouter();
  return (
    <BaseLayout
      header={<PageHeader title="마감 임박 게시물" onBack={() => router.push(PATH.TRADE.MAIN)} />}
    >
      <Suspense fallback={<div>마감 임박 게시물을 불러오는 중입니다...</div>}>
        <DeadlinePageClient />
      </Suspense>
    </BaseLayout>
  );
}
