'use client';

import { useState } from 'react';

import { COIN_HISTORY_DEFAULT_SIZE } from '@/pages/mypage/coin-history/lib/constants';
import { useUserCoinHistoryQuery, useUserCoinQuery } from '@/pages/mypage/coin-history/model/queries';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';

import { CoinBalanceSection } from '../ui/CoinBalanceSection';
import { CoinHistoryList } from '../ui/CoinHistoryList';
import { CoinInfoModal } from '../ui/CoinInfoModal';
import { CoinUsageSection } from '../ui/CoinUsageSection';

export default function CoinHistoryPage() {
  const { data, isLoading, isError } = useUserCoinQuery();
  const { data: historyData, isLoading: historyLoading } = useUserCoinHistoryQuery({ size: COIN_HISTORY_DEFAULT_SIZE });
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  if (isLoading) {
    return (
      <BaseLayout
        header={<PageHeader title="코인 내역" onBack={() => history.back()} />}
        showBottomNav
      >
        <div className="p-5 space-y-6">
          <div className="bg-[var(--white)] rounded-xl p-8 text-center">
            <p className="font-label-regular text-[var(--gray-dark)]">로딩 중...</p>
          </div>
        </div>
      </BaseLayout>
    );
  }

  if (isError || !data) {
    return (
      <BaseLayout
        header={<PageHeader title="코인 내역" onBack={() => history.back()} />}
        showBottomNav
      >
        <div className="p-5 space-y-6">
          <div className="bg-[var(--white)] rounded-xl p-8 text-center">
            <p className="font-label-regular text-[var(--gray-dark)]">
              코인 정보를 불러오지 못했습니다.
            </p>
          </div>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout
      header={<PageHeader title="코인 내역" onBack={() => history.back()} />}
      showBottomNav
    >
      <div className="p-5 space-y-6">
        <CoinBalanceSection coinAmount={data.coin} />

        <CoinUsageSection onInfoClick={() => setIsInfoModalOpen(true)} />

        <div className="space-y-3">
          <h2 className="font-body-semibold">BADATA 코인 내역</h2>
          <CoinHistoryList historyData={historyData} isLoading={historyLoading} />
        </div>
      </div>

      <CoinInfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} />
    </BaseLayout>
  );
}
