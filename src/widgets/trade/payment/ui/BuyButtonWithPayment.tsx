import { BuyButton } from '@/shared/ui/BuyButton/BuyButton';
import { usePayment } from '@/widgets/trade/payment/model/usePayment';
import PaymentStatusDrawer from '@/widgets/trade/payment/ui/PaymentStatusDrawer';

interface BuyButtonWithPaymentProps {
  postId: number;
  title: string;
  price: number;
  children?: React.ReactNode;
}

export default function BuyButtonWithPayment({
  postId,
  title,
  price,
  children = '구매하기',
}: BuyButtonWithPaymentProps) {
  const { loading, isPaid, handlePayment, isDrawerOpen, closeDrawer } = usePayment(
    postId,
    title,
    price,
  );

  return (
    <>
      <BuyButton
        onClick={handlePayment}
        // TODO: 버튼 비활성화 및 텍스트 변경은 BuyButton 내부에서 처리 필요
      >
        {isPaid ? '결제 완료' : loading ? '결제 처리 중...' : children}
      </BuyButton>
      <PaymentStatusDrawer open={isDrawerOpen} onClose={closeDrawer} />
    </>
  );
}
