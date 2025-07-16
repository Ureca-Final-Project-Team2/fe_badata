'use client';

import { useRouter } from 'next/navigation';
import { TradeDataRegisterForm } from '@features/trade/ui/TradeDataRegisterForm';
import { PageHeader } from '@ui/Header';
import { BaseLayout } from '@shared/components/layout/BaseLayout';

export default function DataRegisterPage() {
  const router = useRouter();

  return (
    <BaseLayout
      header={<PageHeader title="데이터 게시물 등록" onBack={() => router.back()} />}
      showBottomNav={false}
    >
      <TradeDataRegisterForm />
    </BaseLayout>
  );
}
