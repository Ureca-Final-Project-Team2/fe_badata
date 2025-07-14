import { useState } from 'react';
import { Gift, List, Plus } from 'lucide-react';

import { BaseLayout } from '@components/layout/BaseLayout';
import { Header } from '@ui/Header';
import { FloatingActionButton } from '@ui/FloatingActionButton';
import { TradePageHeader } from '@features/trade/components/TradePageHeader';
import { TradeDataList } from '@features/trade/components/TradeDataList';

export default function TradeDataPage() {
  const [sortOption, setSortOption] = useState<'latest' | 'popular'>('latest');
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
      showBottomNav={!isSortDrawerOpen}
      className="px-0"
      fab={
        <FloatingActionButton mode="expand" actions={fabActions} triggerAction={triggerAction} />
      }
    >
      <TradePageHeader />
      <TradeDataList
        sortOption={sortOption}
        setSortOption={setSortOption}
        isSortDrawerOpen={isSortDrawerOpen}
        setIsSortDrawerOpen={setIsSortDrawerOpen}
      />
    </BaseLayout>
  );
}
