'use client';

import PurchasedGifticonDetailPage from '@/features/mypage/purchase-history/gifticon-detail/page/PurchasedGifticonDetailPage';

export default function Page({ params }: { params: { gifticonId: string } }) {
  return <PurchasedGifticonDetailPage gifticonId={params.gifticonId} />;
}
