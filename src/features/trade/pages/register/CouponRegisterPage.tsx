'use client';

import { useRouter } from 'next/navigation';
import { TradeCouponRegisterForm } from '@features/trade/ui/TradeGifticonRegisterForm';
import { PageHeader } from '@ui/Header';
import { BaseLayout } from '@shared/components/layout/BaseLayout';

export default function CouponRegisterPage() {
  const router = useRouter();

  return (
    <BaseLayout
      header={<PageHeader title="쿠폰 게시물 등록" onBack={() => router.back()} />}
      showBottomNav={false}
    >
      <TradeCouponRegisterForm />
    </BaseLayout>
  );
}
