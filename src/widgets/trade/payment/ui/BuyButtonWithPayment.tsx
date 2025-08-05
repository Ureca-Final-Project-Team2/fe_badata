import React, { useEffect, useState } from 'react';

import { useTradePostLikeHooks } from '@/entities/trade-post/model/useTradePostLikeHooks';
import { useCoinQuery } from '@/entities/user';
import { useAuthRequiredRequest } from '@/shared/hooks/useAuthRequiredRequest';
import { CoinPaymentModal } from '@/shared/ui/CoinPaymentModal';
import { usePayment } from '@/widgets/trade/payment/model/usePayment';
import { DetailLikeButton } from '@/widgets/trade/ui/DetailLikeButton';
import { PaymentButton } from '@/widgets/trade/ui/PaymentButton';

interface BuyButtonWithPaymentProps {
  postId: number;
  title: string;
  price: number;
  children?: React.ReactNode;
  initialIsLiked?: boolean;
  isSold?: boolean; // 거래 완료 상태
  onPaymentSuccess?: (usedCoin: number) => void;
}

// 좋아요 버튼만을 위한 독립적인 컴포넌트
const LikeButtonSection = React.memo(function LikeButtonSection({
  postId,
  initialIsLiked,
  disabled,
}: {
  postId: number;
  initialIsLiked: boolean;
  disabled: boolean;
}) {
  const [currentIsLiked, setCurrentIsLiked] = useState(initialIsLiked);
  const { toggleLikeById, getCachedLikeState, isItemLoading } = useTradePostLikeHooks();

  // 캐시에서 좋아요 상태를 가져와서 동기화
  useEffect(() => {
    const cachedState = getCachedLikeState(postId, initialIsLiked);
    setCurrentIsLiked(cachedState);
  }, [postId, initialIsLiked, getCachedLikeState]);

  const handleLikeClick = () => {
    if (!isItemLoading(postId)) {
      toggleLikeById(postId, currentIsLiked);
      setCurrentIsLiked(!currentIsLiked);
    }
  };

  return <DetailLikeButton active={currentIsLiked} onClick={handleLikeClick} disabled={disabled} />;
});

// 결제 버튼만을 위한 독립적인 컴포넌트
const PaymentButtonSection = React.memo(function PaymentButtonSection({
  onClick,
  children,
  disabled,
  isSold,
}: {
  onClick: () => void;
  children: React.ReactNode;
  disabled: boolean;
  isSold: boolean;
}) {
  return (
    <PaymentButton onClick={onClick} disabled={disabled} isSold={isSold}>
      {children}
    </PaymentButton>
  );
});

export default function BuyButtonWithPayment({
  postId,
  title,
  price,
  children = '구매하기',
  initialIsLiked = false,
  isSold = false,
  onPaymentSuccess,
}: BuyButtonWithPaymentProps) {
  const {
    data: coinData,
    isLoading: isCoinLoading,
    isError: isCoinError,
    refetch: refetchCoin,
  } = useCoinQuery();
  const { loading, isPaid, handlePayment, isCoinModalOpen, openCoinModal, closeCoinModal } =
    usePayment(postId, title, price, onPaymentSuccess);
  const { executeWithAuth } = useAuthRequiredRequest();

  const handleBuyClick = () => {
    // 코인 데이터를 가져오는 API와 결제 API 모두 로그인이 필요한지 체크
    executeWithAuth(() => {
      // 코인 데이터 에러 시 재시도
      if (isCoinError) {
        refetchCoin();
      }
      openCoinModal();
      return Promise.resolve();
    }, `/api/v1/trades/order/${postId}`);
  };

  const handleCoinPayment = (useCoin: boolean, coinAmount: number) => {
    // 실제 결제 진행 (useCoin이 true일 때만 coinAmount 전달)
    const actualUsedCoin = useCoin ? coinAmount : 0;
    handlePayment(actualUsedCoin);
    closeCoinModal();
  };

  const isDisabled = loading || isPaid;

  return (
    <>
      <div className="flex flex-row items-center gap-6">
        <LikeButtonSection
          postId={postId}
          initialIsLiked={initialIsLiked}
          disabled={isDisabled || isSold}
        />
        <PaymentButtonSection onClick={handleBuyClick} disabled={isDisabled} isSold={isSold}>
          {loading ? '결제 처리 중...' : children}
        </PaymentButtonSection>
      </div>

      <CoinPaymentModal
        isOpen={isCoinModalOpen}
        onClose={closeCoinModal}
        originalPrice={price}
        availableCoin={coinData?.content?.coin || 0}
        onConfirm={handleCoinPayment}
        isCoinLoading={isCoinLoading}
        isCoinError={isCoinError}
        onRetry={refetchCoin}
      />
    </>
  );
}
