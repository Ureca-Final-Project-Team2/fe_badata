import { useState } from 'react';
import { Gift, List, Plus } from 'lucide-react';

import { BaseLayout } from '@components/layout/BaseLayout';
import { Header } from '@ui/Header';
import { FloatingActionButton } from '@ui/FloatingActionButton';
import { TradePageHeader } from '@features/trade/ui/TradePageHeader';
import { TradeCouponList } from '@features/trade/ui/TradeCouponList';
import { TradeCouponFilter } from '@features/trade/ui/TradeCouponFilter';

export default function TradeCouponPage() {
  const [sortOption, setSortOption] = useState<'latest' | 'popular'>('latest');
  const [isSortDrawerOpen, setIsSortDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

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
      <TradeCouponFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <TradeCouponList
        sortOption={sortOption}
        setSortOption={setSortOption}
        isSortDrawerOpen={isSortDrawerOpen}
        setIsSortDrawerOpen={setIsSortDrawerOpen}
        selectedCategory={selectedCategory}
      />
    </BaseLayout>
  );
}
