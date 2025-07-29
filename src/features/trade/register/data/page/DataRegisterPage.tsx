'use client';

import { useRouter } from 'next/navigation';

import { TradeDataRegisterForm } from '@/features/trade/register/data/ui/DataRegisterForm';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';

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
