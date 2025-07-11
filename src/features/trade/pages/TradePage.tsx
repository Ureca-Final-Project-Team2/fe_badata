'use client';

import { useState } from 'react';
import { BaseLayout } from '@components/layout/BaseLayout';
import { TradePageHeader } from '@features/trade/components/TradePageHeader';
import { TradeMainBanner } from '@features/trade/components/TradeMainBanner';
import { TradeMainList } from '@features/trade/components/TradeMainList';
import { Header } from '@ui/Header';
import { FloatingActionButton } from '@ui/FloatingActionButton';
import { Gift, List, Plus } from 'lucide-react';

export default function TradePage() {
  const [isSortDrawerOpen, setIsSortDrawerOpen] = useState(false);

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
      showBottomNav={!isSortDrawerOpen}
      fab={
        <FloatingActionButton mode="expand" actions={fabActions} triggerAction={triggerAction} />
      }
    >
      <TradePageHeader />
      <TradeMainBanner />
      <TradeMainList
        isSortDrawerOpen={isSortDrawerOpen}
        setIsSortDrawerOpen={setIsSortDrawerOpen}
      />
    </BaseLayout>
  );
}
