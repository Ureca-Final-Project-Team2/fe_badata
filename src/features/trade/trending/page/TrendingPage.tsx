import { Suspense } from 'react';

import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeaderWithBack } from '@/shared/ui/Header/PageHeaderWithBack';

import TrendingPageClient from '../_client/TrendingPageClient';

export default function TrendingPage() {
  return (
    <BaseLayout header={<PageHeaderWithBack title="실시간 핫한 게시물" />}>
      <Suspense fallback={<div>핫한 게시물을 불러오는 중입니다...</div>}>
        <TrendingPageClient />
      </Suspense>
    </BaseLayout>
  );
}
