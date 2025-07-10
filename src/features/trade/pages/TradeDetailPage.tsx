'use client';

import { BuyButton } from '@ui/BuyButton';
import { TradeDetailProductSection } from '@features/trade/components/TradeDetailProductSection';
import { TradeDetailSellerSection } from '@features/trade/components/TradeDetailSellerSection';

interface Props {
  tradeId: string;
}

export const TradeDetailPage = ({ tradeId }: Props) => {
  return (
    <>
      <TradeDetailProductSection />
      <TradeDetailSellerSection />

      {/* 화면 하단 고정 버튼 */}
      <div className="fixed bottom-[90px] left-1/2 -translate-x-1/2 z-20">
        <BuyButton variant="primary" size="lg" onClick={() => console.log('구매하기')}>
          구매하기
        </BuyButton>
      </div>
    </>
  );
};
