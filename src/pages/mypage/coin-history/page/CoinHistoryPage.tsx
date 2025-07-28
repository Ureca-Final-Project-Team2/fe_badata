'use client';

import { useState } from 'react';

import { COIN_HISTORY_DEFAULT_SIZE } from '@/pages/mypage/coin-history/lib/constants';
import { useUserCoinHistoryQuery, useUserCoinQuery } from '@/pages/mypage/coin-history/model/queries';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';

import { CoinBalanceSection } from '../ui/CoinBalanceSection';
import { CoinHistoryList } from '../ui/CoinHistoryList';
import { CoinInfoDrawer } from '../ui/CoinInfoDrawer';
import { CoinUsageSection } from '../ui/CoinUsageSection';

export default function CoinHistoryPage() {
  const { data, isLoading, isError } = useUserCoinQuery();
  const { data: historyData, isLoading: historyLoading } = useUserCoinHistoryQuery({ size: COIN_HISTORY_DEFAULT_SIZE });
  const [isInfoDrawerOpen, setIsInfoDrawerOpen] = useState(false);

  if (isLoading) return <p>로딩 중...</p>;
  if (isError || !data) return <p>코인 정보를 불러오지 못했습니다.</p>;

  return (
    <BaseLayout
      header={<PageHeader title="코인 내역" onBack={() => history.back()} />}
      showBottomNav
    >
      <div className="p-5 space-y-6">
        <CoinBalanceSection coinAmount={data.coin} />

        <CoinUsageSection onInfoClick={() => setIsInfoDrawerOpen(true)} />

        <div className="space-y-3">
          <h2 className="font-body-semibold">BADATA 코인 내역</h2>
          <CoinHistoryList historyData={historyData} isLoading={historyLoading} />
        </div>
      </div>

      <CoinInfoDrawer isOpen={isInfoDrawerOpen} onClose={() => setIsInfoDrawerOpen(false)} />
    </BaseLayout>
  );
}
