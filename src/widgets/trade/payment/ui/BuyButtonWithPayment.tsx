import { useEffect, useState } from 'react';

import { useTradePostLikeHooks } from '@/entities/trade-post/model/useTradePostLikeHooks';
import { useCoinQuery } from '@/entities/user/model/queries';
import { BuyButton } from '@/shared/ui/BuyButton/BuyButton';
import { CoinPaymentModal } from '@/shared/ui/CoinPaymentModal';
import { usePayment } from '@/widgets/trade/payment/model/usePayment';
import PaymentStatusDrawer from '@/widgets/trade/payment/ui/PaymentStatusDrawer';

interface BuyButtonWithPaymentProps {
  postId: number;
  title: string;
  price: number;
  children?: React.ReactNode;
  initialIsLiked?: boolean;
  isSold?: boolean; // 거래 완료 상태
}

export default function BuyButtonWithPayment({
  postId,
  title,
  price,
  children = '구매하기',
  initialIsLiked = false,
  isSold = false,
}: BuyButtonWithPaymentProps) {
  const [currentIsLiked, setCurrentIsLiked] = useState(initialIsLiked);
  const [isCoinModalOpen, setIsCoinModalOpen] = useState(false);

  const { data: coinData } = useCoinQuery();
  const { loading, isPaid, handlePayment, isDrawerOpen, closeDrawer } = usePayment(
    postId,
    title,
    price,
  );

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

  const handleBuyClick = () => {
    setIsCoinModalOpen(true);
  };

  const handleCoinPayment = (useCoin: boolean, coinAmount: number) => {
    // 실제 결제 진행 (useCoin이 true일 때만 coinAmount 전달)
    handlePayment(useCoin ? coinAmount : 0);
    setIsCoinModalOpen(false);
  };

  return (
    <>
      <BuyButton
        onClick={handleBuyClick}
        likeActive={currentIsLiked}
        onLikeClick={handleLikeClick}
        disabled={loading || isPaid || isItemLoading(postId)}
        isSold={isSold}
      >
        {loading ? '결제 처리 중...' : children}
      </BuyButton>

      <CoinPaymentModal
        isOpen={isCoinModalOpen}
        onClose={() => setIsCoinModalOpen(false)}
        originalPrice={price}
        availableCoin={coinData?.content?.coin || 0}
        onConfirm={handleCoinPayment}
      />

      <PaymentStatusDrawer open={isDrawerOpen} onClose={closeDrawer} />
    </>
  );
}
