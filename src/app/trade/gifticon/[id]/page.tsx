import { lazy, Suspense } from 'react';

import { getTradePostDetail } from '@/features/trade/data/detail/api/apis';
import { BaseLayout } from '@/shared/ui/BaseLayout';

const TradeDetailPage = lazy(
  () => import('@/features/trade/gifticon/detail/page/GifticonDetailPage'),
);

interface Props {
  params: Promise<{ id: string }>;
}

// Loading fallback component for main content
const GifticonDetailContentLoadingFallback = () => (
  <BaseLayout>
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--main-5)] mx-auto mb-4"></div>
        <p className="text-[var(--main-5)]">기프티콘 상세 페이지 로딩 중...</p>
      </div>
    </div>
  </BaseLayout>
);

export default async function GifticonDetailPage(props: Props) {
  const { params } = await props;
  const { id } = await params;

  const { postUserId, post, sellerName } = await getTradePostDetail(id);

  return (
    <Suspense fallback={<GifticonDetailContentLoadingFallback />}>
      <TradeDetailPage
        tradeId={id}
        post={post}
        postUserId={postUserId}
        postType="GIFTICON"
        sellerName={sellerName}
      />
    </Suspense>
  );
}
