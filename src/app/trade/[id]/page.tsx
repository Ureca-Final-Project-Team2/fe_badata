'use client';
import React from 'react';
import { PageHeader } from '@ui/Header';
import { BaseLayout } from '@shared/components/layout/BaseLayout';
import { TradeDetailContent } from '@features/trade/components/TradeDetailContent';

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
      <TradeDetailContent tradeId={id} />
    </BaseLayout>
  );
}
