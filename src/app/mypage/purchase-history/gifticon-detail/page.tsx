'use client';

import { Suspense } from 'react';

import { useSearchParams } from 'next/navigation';

import PurchasedGifticonDetailPage from '@/features/mypage/purchase-history/gifticon-detail/page/PurchasedGifticonDetailPage';

function GifticonDetailContent() {
  const searchParams = useSearchParams();
  const encodedGifticonId = searchParams.get('id');

  if (!encodedGifticonId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-[var(--red)]">기프티콘 ID가 필요합니다.</p>
      </div>
    );
  }

  const gifticonId = decodeURIComponent(encodedGifticonId);

  return <PurchasedGifticonDetailPage gifticonId={gifticonId} />;
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--main-3)]"></div>
        </div>
      }
    >
      <GifticonDetailContent />
    </Suspense>
  );
}
