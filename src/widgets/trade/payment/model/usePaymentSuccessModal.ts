import { useState } from 'react';

import { useCoinQuery } from '@/entities/user/model/queries';

/**
 * 결제 성공 모달 상태와 로직을 관리하는 커스텀 훅
 *
 * @returns 결제 성공 모달 관련 상태와 핸들러 함수들
 */
export const usePaymentSuccessModal = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [usedCoin, setUsedCoin] = useState(0);

  const { data: coinData } = useCoinQuery();

  /**
   * 결제 성공 시 호출되는 핸들러
   * @param usedCoinAmount 사용된 코인 금액
   */

  const handlePaymentSuccess = (usedCoinAmount: number) => {
    setUsedCoin(usedCoinAmount);
    setIsPaymentModalOpen(true);
  };

  /**
   * 결제 모달을 닫는 핸들러
   */
  const closeModal = () => setIsPaymentModalOpen(false);

  return {
    isPaymentModalOpen,
    usedCoin,
    coinData,
    handlePaymentSuccess,
    closeModal,
  };
};
