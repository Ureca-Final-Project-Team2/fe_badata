import { useState } from 'react';

import { AxiosError } from 'axios';

import { END_POINTS } from '@/shared/api/endpoints';
import { useAuthRequiredRequest } from '@/shared/hooks/useAuthRequiredRequest';
import { makeToast } from '@/shared/lib/makeToast';
import { createPayment, verifyPayment } from '@/widgets/trade/payment/api/apis';

import type {
  CreatePaymentResponse,
  IamportRequestPayParams,
  IamportResponse,
} from '@/widgets/trade/payment/lib/types';

declare global {
  interface Window {
    IMP: {
      init: (key: string) => void;
      request_pay: (
        params: IamportRequestPayParams,
        callback: (rsp: IamportResponse) => void,
      ) => void;
    };
  }
}

export function usePayment(
  postId: number,
  title: string,
  price: number,
  onPaymentSuccess?: (usedCoin: number) => void,
) {
  const [loading, setLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isCoinModalOpen, setIsCoinModalOpen] = useState(false);
  const [usedCoin, setUsedCoin] = useState(0);
  const { executeWithAuth } = useAuthRequiredRequest();

  /**
   * 공통 에러 처리 함수
   * @param error 발생한 에러 객체
   * @param defaultMessage 기본 에러 메시지
   */
  const handleError = (error: unknown, defaultMessage: string) => {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message;
      makeToast(errorMessage || defaultMessage, 'warning');
    } else if (error instanceof Error) {
      makeToast(error.message, 'warning');
    } else {
      makeToast(defaultMessage, 'warning');
    }
  };

  const handlePayment = async (useCoin: number = 0) => {
    // 최소 결제 금액 검증
    const MIN_PAYMENT = 100;
    const finalPrice = price - useCoin;
    if (finalPrice < MIN_PAYMENT) {
      makeToast(`최소 결제 금액은 ${MIN_PAYMENT.toLocaleString()}원입니다.`, 'warning');
      return;
    }

    // 최대 코인 사용량 검증 (거래당 최대 10,000 코인)
    const MAX_COIN_PER_TX = 10000;
    if (useCoin > MAX_COIN_PER_TX) {
      makeToast(
        `거래당 최대 ${MAX_COIN_PER_TX.toLocaleString()}원까지 코인을 사용할 수 있습니다.`,
        'warning',
      );
      return;
    }

    setUsedCoin(useCoin);
    setLoading(true);

    const requestFn = async () => {
      let merchant_uid = '';
      let finalAmount = price;

      try {
        // 실제 사용할 코인 금액 전달
        const res = await createPayment(postId, useCoin);

        // 응답 데이터 추출
        const responseData = res?.data || res;

        if (!responseData || typeof responseData !== 'object' || !('merchantUid' in responseData)) {
          makeToast('결제 고유 ID 응답이 올바르지 않습니다.', 'warning');
          setLoading(false);
          return;
        }

        const createPaymentData = responseData as CreatePaymentResponse;
        merchant_uid = createPaymentData.merchantUid;
        finalAmount = createPaymentData.amount || price;

        if (!window.IMP) {
          makeToast('포트원 SDK 로드 실패', 'warning');
          setLoading(false);
          return;
        }

        const channelKey = process.env.NEXT_PUBLIC_IAMPORT_CHANNEL_KEY;
        if (!channelKey) {
          makeToast('결제 설정 오류: 채널 키가 설정되지 않았습니다.', 'warning');
          setLoading(false);
          return;
        }

        const impCode = process.env.NEXT_PUBLIC_IAMPORT_IMP_CODE;
        if (!impCode) {
          makeToast('결제 설정 오류: IMP 코드가 설정되지 않았습니다.', 'warning');
          setLoading(false);
          return;
        }
        window.IMP.init(impCode);
        window.IMP.request_pay(
          {
            channelKey,
            pay_method: 'CARD',
            merchant_uid,
            name: title,
            amount: finalAmount,
            buyer_email: 'gildong@gmail.com',
            buyer_name: '홍길동',
            buyer_tel: '010-4242-4242',
            buyer_addr: '서울특별시 강남구 신사동',
            buyer_postcode: '01181',
          },
          async (rsp: IamportResponse) => {
            if (rsp.code != null) {
              makeToast(`결제 실패: ${rsp.message}`, 'warning');
            } else {
              try {
                const impUid = rsp.imp_uid || rsp.impUid;
                if (!impUid) {
                  makeToast('결제 고유 ID를 받지 못했습니다.', 'warning');
                  return;
                }

                await verifyPayment(impUid, postId);
                setIsPaid(true);
                onPaymentSuccess?.(useCoin);
              } catch (e) {
                handleError(e, '결제 검증 실패');
              }
            }
            setLoading(false);
          },
        );
      } catch (e) {
        handleError(e, '결제 고유 ID 발급 실패');
        setLoading(false);
      }
    };

    try {
      await executeWithAuth(
        requestFn,
        `${END_POINTS.TRADES.CREATE_PAYMENT(postId)}`,
        {
          type: 'TRADE_POST',
          method: 'POST',
          data: {
            postId,
            useCoin,
          },
        },
        () => {
          // AuthModal이 닫힐 때 loading 상태 초기화
          setLoading(false);
        },
      );
    } catch {
      // 에러는 이미 위에서 처리됨
    }
  };

  const openCoinModal = () => setIsCoinModalOpen(true);
  const closeCoinModal = () => setIsCoinModalOpen(false);

  return {
    loading,
    isPaid,
    handlePayment,
    isCoinModalOpen,
    openCoinModal,
    closeCoinModal,
    usedCoin,
  };
}
