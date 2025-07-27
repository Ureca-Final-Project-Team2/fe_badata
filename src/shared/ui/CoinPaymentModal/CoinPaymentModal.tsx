'use client';

import { useEffect, useState } from 'react';

import { formatPrice } from '@/shared/lib/formatPrice';
import { CoinToggle } from '@/shared/ui/CoinToggle';
import { Modal } from '@/shared/ui/Modal';

interface CoinPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalPrice: number;
  availableCoin: number;
  onConfirm: (useCoin: boolean, coinAmount: number, finalPrice?: number) => void;
}

export function CoinPaymentModal({
  isOpen,
  onClose,
  originalPrice,
  availableCoin,
  onConfirm,
}: CoinPaymentModalProps) {
  const [useCoin, setUseCoin] = useState(false);
  const [coinAmount, setCoinAmount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(originalPrice);

  // 코인 사용 시 실시간 계산
  useEffect(() => {
    if (useCoin && coinAmount > 0) {
      const discount = Math.min(coinAmount, availableCoin);
      setFinalPrice(Math.max(originalPrice - discount, 0));
    } else {
      setFinalPrice(originalPrice);
    }
  }, [useCoin, coinAmount, availableCoin, originalPrice]);

  // 코인 사용 토글 시 초기화
  useEffect(() => {
    if (!useCoin) {
      setCoinAmount(0);
    }
  }, [useCoin]);

  const handleCoinAmountChange = (value: string) => {
    const amount = parseInt(value) || 0;
    const maxAmount = Math.min(amount, availableCoin);
    setCoinAmount(maxAmount);
  };

  const handleConfirm = () => {
    onConfirm(useCoin, coinAmount, finalPrice);
    onClose();
  };

  const discountAmount = originalPrice - finalPrice;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <h2 className="font-body-semibold text-[var(--black)]">결제하기</h2>
          <button onClick={onClose} className="text-[var(--gray-mid)] hover:text-[var(--black)]">
            ✕
          </button>
        </div>

        {/* 원래 결제 금액 */}
        <div className="bg-[var(--gray-light)] rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-[var(--black)] font-label-medium">결제 금액</span>
            <span className="text-lg font-label-semibold text-[var(--black)]">
              {formatPrice(originalPrice.toString())}원
            </span>
          </div>
        </div>

        {/* 코인 사용 섹션 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[var(--black)] font-label-medium">코인 사용</span>
              <span className="text-sm text-[var(--gray-mid)]">
                (보유: {formatPrice(availableCoin.toString())}원)
              </span>
            </div>
            <CoinToggle checked={useCoin} onCheckedChange={setUseCoin} />
          </div>

          {/* 코인 사용 시 입력 필드 */}
          {useCoin && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--gray-mid)]">사용할 코인:</span>
                <input
                  type="number"
                  value={coinAmount}
                  onChange={(e) => handleCoinAmountChange(e.target.value)}
                  placeholder="0"
                  className="flex-1 px-3 py-2 border border-[var(--gray-light)] rounded-lg text-sm focus:outline-none focus:border-[var(--main-3)]"
                  min="0"
                  max={availableCoin}
                />
                <span className="text-sm text-[var(--gray-mid)]">원</span>
              </div>
              <div className="font-small-regular text-[var(--gray-mid)]">
                최대 {formatPrice(availableCoin.toString())}원까지 사용 가능
              </div>
            </div>
          )}
        </div>

        {/* 할인 및 최종 금액 */}
        {useCoin && coinAmount > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-[var(--gray-mid)]">할인 금액</span>
              <span className="text-[var(--main-3)] font-medium">
                -{formatPrice(discountAmount.toString())}원
              </span>
            </div>
          </div>
        )}

        {/* 최종 결제 금액 */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="font-body-semibold text-[var(--black)]">최종 결제 금액</span>
            <span className="font-body-semibold text-[var(--black)]">
              {formatPrice(finalPrice.toString())}원
            </span>
          </div>
        </div>

        {/* 결제 버튼 */}
        <button
          onClick={handleConfirm}
          disabled={finalPrice === 0}
          className="w-full bg-[var(--main-3)] text-white py-4 rounded-lg font-body-semibold disabled:bg-[var(--gray-light)] disabled:text-[var(--gray-mid)]"
        >
          {formatPrice(finalPrice.toString())}원 결제하기
        </button>
      </div>
    </Modal>
  );
}
