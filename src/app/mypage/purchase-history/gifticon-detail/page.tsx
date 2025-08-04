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

  // 안전한 디코딩 및 검증
  let gifticonId: string;
  try {
    gifticonId = decodeURIComponent(encodedGifticonId);
    // 숫자만 허용하는 검증
    if (!/^\d+$/.test(gifticonId)) {
      throw new Error('Invalid gifticon ID format');
    }
  } catch {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-[var(--red)]">잘못된 기프티콘 ID입니다.</p>
      </div>
    );
  }

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
