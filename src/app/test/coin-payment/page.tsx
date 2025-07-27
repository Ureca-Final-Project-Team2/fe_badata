'use client';

import { useState } from 'react';

import { useCoinQuery } from '@/entities/user/model/queries';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { CoinPaymentModal } from '@/shared/ui/CoinPaymentModal';
import { PageHeader } from '@/shared/ui/Header';
import { usePayment } from '@/widgets/trade/payment/model/usePayment';

export default function CoinPaymentTestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: coinData, isLoading: coinLoading, error: coinError } = useCoinQuery();
  const { loading: paymentLoading, isPaid, handlePayment } = usePayment(1, '테스트 상품', 14700);

  // 디버깅용 콘솔 로그
  console.log('Coin API Response:', { coinData, coinLoading, coinError });

  const handleCoinPayment = (useCoin: boolean, coinAmount: number, finalPrice?: number) => {
    console.log('코인 결제 모달에서 확인:', { useCoin, coinAmount, finalPrice });

    // 실제 결제 진행 (useCoin이 true일 때만 coinAmount 전달)
    handlePayment(useCoin ? coinAmount : 0);

    // 모달 닫기
    setIsModalOpen(false);
  };

  return (
    <BaseLayout
      header={<PageHeader title="코인 결제 테스트" onBack={() => window.history.back()} />}
      showBottomNav
    >
      <div className="p-4 space-y-6">
        <div className="bg-[var(--gray-light)] rounded-lg p-4">
          <h3 className="font-semibold text-[var(--black)] mb-2">테스트 정보</h3>
          <p className="text-sm text-[var(--gray-mid)]">
            원래 결제 금액: 14,700원
            <br />
            보유 코인:{' '}
            {coinLoading ? '로딩 중...' : coinError ? '에러' : `${coinData?.content?.coin || 0}원`}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          disabled={paymentLoading}
          className="w-full bg-[var(--main-3)] text-white py-4 rounded-lg font-semibold disabled:bg-[var(--gray-light)] disabled:text-[var(--gray-mid)]"
        >
          {paymentLoading ? '결제 진행 중...' : '결제하기 (14,700원)'}
        </button>

        {isPaid && (
          <div className="bg-[var(--main-1)] rounded-lg p-4">
            <h3 className="font-semibold text-[var(--black)] mb-2">결제 완료!</h3>
            <p className="text-sm text-[var(--black)]">결제가 성공적으로 완료되었습니다.</p>
          </div>
        )}

        {paymentLoading && (
          <div className="bg-[var(--gray-light)] rounded-lg p-4">
            <h3 className="font-semibold text-[var(--black)] mb-2">결제 진행 중...</h3>
            <p className="text-sm text-[var(--gray-mid)]">포트원 결제 창이 열렸습니다.</p>
          </div>
        )}

        <CoinPaymentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          originalPrice={14700}
          availableCoin={coinData?.content?.coin || 0}
          onConfirm={handleCoinPayment}
        />
      </div>
    </BaseLayout>
  );
}
