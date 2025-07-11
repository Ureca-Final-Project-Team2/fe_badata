'use client';
import React from 'react';
import { PageHeader } from '@ui/Header';
import { BaseLayout } from '@shared/components/layout/BaseLayout';
import { TradeDetailPage } from '@features/trade/pages/TradeDetailPage';

interface Props {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: Props) {
  const { id } = React.use(params);

  const handleShareClick = () => {
    // 공유 기능 구현
    console.log('공유하기 클릭');
  };

  const handleMoreClick = () => {
    // 더보기 기능 구현
    console.log('더보기 클릭');
  };

  return (
    <BaseLayout
      header={
        <PageHeader
          title="상세보기"
          onBack={() => history.back()}
          variant="with-actions"
          onShareClick={handleShareClick}
          onMoreClick={handleMoreClick}
        />
      }
      className="h-[calc(100vh-70px)]"
    >
      <TradeDetailPage tradeId={id} />
    </BaseLayout>
  );
}
