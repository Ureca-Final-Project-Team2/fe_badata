'use client';

import { useState } from 'react';

import { useUserCoinQuery } from '@/features/mypage/coin-history/model/queries';
import { CoinBalanceSection } from '@/features/mypage/coin-history/ui/CoinBalanceSection';
import { CoinHistoryInfiniteList } from '@/features/mypage/coin-history/ui/CoinHistoryInfiniteList';
import { CoinInfoModal } from '@/features/mypage/coin-history/ui/CoinInfoModal';
import { CoinUsageSection } from '@/features/mypage/coin-history/ui/CoinUsageSection';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';

export default function CoinHistoryPage() {
  const { data, isLoading, isError } = useUserCoinQuery();
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  // Hydration mismatch 방지를 위해 초기 상태 처리
  const isInitialLoading = isLoading && !data;

  if (isInitialLoading) {
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
          <CoinHistoryInfiniteList />
        </div>
      </div>

      <CoinInfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} />
    </BaseLayout>
  );
}
