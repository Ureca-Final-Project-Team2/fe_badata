'use client';

import { useRouter } from 'next/navigation';

import { TradeCouponRegisterForm } from '@/pages/trade/register/gifticon/ui/TradeGifticonRegisterForm';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';

export default function RegisterGifticonPage() {
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
