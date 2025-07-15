'use client';

import { Gift, List, Plus } from 'lucide-react';
import { BaseLayout } from '@components/layout/BaseLayout';
import { Header } from '@ui/Header';
import { FloatingActionButton } from '@ui/FloatingActionButton';
import { TradePageHeader } from '@features/trade/ui/TradePageHeader';
import { TradeDeadlineBanner } from '@features/trade/ui/banner/TradeDeadlineBanner';

export default function TradeMainPage() {
  const fabActions = [
    {
      icon: <Gift />,
      label: '데이터',
      onClick: () => {
        // TODO: 데이터 등록 페이지 이동
      },
    },
    {
      icon: <List />,
      label: '쿠폰',
      onClick: () => {
        // TODO: 쿠폰 등록 페이지 이동
      },
    },
  ];

  const triggerAction = {
    icon: <Plus />,
    label: '글쓰기',
    onClick: () => {},
  };

  return (
    <BaseLayout
      header={<Header />}
      className="px-0"
      showBottomNav
      fab={
        <FloatingActionButton mode="expand" actions={fabActions} triggerAction={triggerAction} />
      }
    >
      <TradePageHeader />
      <TradeDeadlineBanner />
    </BaseLayout>
  );
}
