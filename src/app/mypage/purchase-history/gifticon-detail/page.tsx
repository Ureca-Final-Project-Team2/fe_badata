'use client';

import { useSearchParams } from 'next/navigation';

import PurchasedGifticonDetailPage from '@/features/mypage/purchase-history/gifticon-detail/page/PurchasedGifticonDetailPage';

export default function Page() {
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
