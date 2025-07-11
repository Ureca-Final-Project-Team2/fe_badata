'use client';
import React from 'react';
import { PageHeader } from '@ui/Header';
import { BaseLayout } from '@shared/components/layout/BaseLayout';
import { TradeDetailPage } from '@/features/trade/pages/TradeDetailPage';

interface Props {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: Props) {
  const { id } = React.use(params);

  return (
    <BaseLayout
      header={<PageHeader title="상세보기" onBack={() => history.back()} />}
      className="h-[calc(100vh-70px)]"
    >
      <TradeDetailPage tradeId={id} />
    </BaseLayout>
  );
}
