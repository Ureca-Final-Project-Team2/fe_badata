import PaymentReceiptModal from './PaymentReceiptModal';

interface PaymentReceiptWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  price: number;
  usedCoin: number;
  availableCoin: number;
}

/**
 * 결제 영수증 모달을 감싸는 공통 컴포넌트
 * 모달 배경과 함께 렌더링하여 중복 코드를 제거
 */
export const PaymentReceiptWrapper = ({
  isOpen,
  onClose,
  title,
  price,
  usedCoin,
  availableCoin,
}: PaymentReceiptWrapperProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative">
        <PaymentReceiptModal
          isOpen={isOpen}
          onClose={onClose}
          title={title}
          price={price}
          usedCoin={usedCoin}
          availableCoin={availableCoin}
        />
      </div>
    </div>
  );
};
