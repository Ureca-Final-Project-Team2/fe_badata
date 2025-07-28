import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ICONS } from '@/shared/config/iconPath';

interface PaymentReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  price: number;
  usedCoin: number;
  availableCoin: number;
}

const PaymentReceiptModal: React.FC<PaymentReceiptModalProps> = ({
  isOpen,
  onClose,
  title,
  price,
  usedCoin,
  availableCoin,
}) => {
  const router = useRouter();
  const finalPrice = price - usedCoin;
  const remainingCoin = availableCoin - usedCoin;

  const handleClose = () => {
    onClose();
  };

  const handleNavigateToTrade = () => {
    onClose();
    router.push('/trade');
  };

  if (!isOpen) return null;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-[var(--white)] rounded-t-2xl shadow-lg w-[320px] mx-auto p-6 relative flex flex-col items-center">
        {/* X 버튼: 카드 상단 우측 - 모달만 닫기 */}
        <button
          className="absolute top-3 right-5 text-[var(--gray-dark)] hover:text-[var(--black)] font-title-semibold"
          onClick={handleClose}
          aria-label="Close modal"
        >
          ×
        </button>

        {/* 바다 로고: 카드 상단 좌측 absolute */}
        <Image
          src={ICONS.LOGO.BADATA}
          alt="badata logo"
          width={60}
          height={18}
          className="object-contain absolute top-3 left-5"
        />

        {/* 거래 완료 메시지 */}
        <div className="w-full flex flex-col items-start mt-18">
          <span className="font-body-semibold text-[var(--black)] leading-tight pb-2">
            결제가 완료되었습니다 🐳
          </span>
        </div>

        <div className="border-t border-dashed border-[var(--gray-light)] my-3 w-full" />

        {/* 게시물 제목 */}
        <div className="w-full flex flex-col items-start pt-2.5 pb-4">
          <span className="font-label-medium text-[var(--black)] leading-tight">{title}</span>
        </div>

        {/* 가격 정보 */}
        <div className="w-full flex flex-col gap-1 mb-2">
          <div className="flex justify-between items-center">
            <span className="font-label-regular text-[var(--gray-dark)]">가격</span>
            <span className="font-label-medium text-[var(--black)]">
              {price.toLocaleString()}원
            </span>
          </div>

          {usedCoin > 0 && (
            <div className="flex justify-between items-center">
              <span className="font-label-regular text-[var(--gray-dark)]">사용 포인트</span>
              <span className="font-label-medium text-[var(--main-5)]">
                -{usedCoin.toLocaleString()}원
              </span>
            </div>
          )}
        </div>

        <div className="border-t border-dashed border-[var(--gray-light)] my-3 w-full" />

        {/* 총 결제 가격 */}
        <div className="w-full flex justify-between items-center pt-2.5 mb-4">
          <span className="font-body-semibold text-[var(--black)]">총 결제 가격</span>
          <span className="font-body-semibold text-[var(--black)]">
            {finalPrice.toLocaleString()}원
          </span>
        </div>

        {/* 남은 포인트 */}
        <div className="w-full bg-[var(--gray-light)] rounded-lg py-4 px-2">
          <div className="flex justify-between items-center">
            <span className="font-label-medium text-[var(--gray-dark)]">잔여 포인트</span>
            <span className="font-label-semibold text-[var(--black)]">
              {remainingCoin.toLocaleString()}원
            </span>
          </div>
        </div>
      </div>

      {/* 구불구불 SVG */}
      <svg
        width="320"
        height="20"
        viewBox="0 0 320 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block"
        style={{ marginTop: '-1px' }}
      >
        <rect width="320" height="10" fill="white" />
        {Array.from({ length: 16 }).map((_, i) => (
          <circle key={i} cx={10 + i * 20} cy={10} r={10} fill="white" stroke="none" />
        ))}
      </svg>

      {/* 버튼 그룹: 영수증 밖 하단 */}
      <div className="mt-4 flex gap-3">
        {/* 거래 페이지로 이동 버튼 */}
        <button
          className="w-[180px] py-3 rounded-xl font-body-semibold shadow-md transition bg-[var(--main-5)] text-[var(--white)] hover:bg-[var(--main-4)]"
          onClick={handleNavigateToTrade}
        >
          홈으로 이동
        </button>
      </div>
    </div>
  );
};

export default PaymentReceiptModal;
