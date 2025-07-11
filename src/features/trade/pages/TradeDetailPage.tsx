'use client';

import React, { useState } from 'react';
import { BaseLayout } from '@shared/components/layout/BaseLayout';
import { PageHeader } from '@ui/Header';
import { TradeDetailProductSection } from '@features/trade/components/TradeDetailProductSection';
import { TradeDetailSellerSection } from '@features/trade/components/TradeDetailSellerSection';
import { BuyButton } from '@ui/BuyButton';
import { TradeDetailDrawer } from '@features/trade/components/TradeDetailDrawer';

interface Props {
  tradeId: string;
}

export const TradeDetailPage = ({ tradeId }: Props) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  // TODO: 실제 사용자 비교 로직으로 대체
  const isOwner = true;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('링크가 복사되었습니다!');
  };

  const handleMore = () => {
    setIsMoreOpen(true);
  };

  return (
    <>
      <BaseLayout
        header={
          <PageHeader
            title="상세보기"
            onBack={() => history.back()}
            variant="with-actions"
            onShareClick={handleShare}
            onMoreClick={handleMore}
          />
        }
        className="h-[calc(100vh-70px)]"
        showBottomNav={!isMoreOpen}
      >
        <TradeDetailProductSection />
        <TradeDetailSellerSection />

        {/* 구매하기 버튼 */}
        <div className="fixed bottom-[84px] left-1/2 -translate-x-1/2 z-20">
          <BuyButton variant="primary" size="lg_thin" onClick={() => console.log('구매하기')}>
            구매하기
          </BuyButton>
        </div>

        {/* 케밥 버튼 Drawer */}
        <TradeDetailDrawer
          isOpen={isMoreOpen}
          onClose={() => setIsMoreOpen(false)}
          isOwner={isOwner}
        />
      </BaseLayout>
    </>
  );
};
