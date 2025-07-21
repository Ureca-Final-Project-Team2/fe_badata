'use client';

import { useRouter } from 'next/navigation';

import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';

import { TradeDataRegisterForm } from '../ui/TradeDataRegisterForm';

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
