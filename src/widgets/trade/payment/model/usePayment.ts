import { useState } from 'react';

import { useAuthStore } from '@/entities/auth/model/authStore';
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
  const { user, isLoggedIn } = useAuthStore();

  const handlePayment = async (useCoin: number = 0) => {
    // 로그인 상태 확인
    if (!isLoggedIn || !user) {
      makeToast('로그인이 필요합니다.', 'warning');
      return;
    }

    setUsedCoin(useCoin);
    setLoading(true);

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
    } catch (e) {
      console.error('createPayment 에러:', e);

      // 에러 타입에 따른 구체적인 메시지 표시
      if (e && typeof e === 'object' && 'response' in e) {
        const axiosError = e as { response?: { data?: { message?: string } } };
        const errorMessage = axiosError.response?.data?.message;
        makeToast(errorMessage || '결제 고유 ID 발급 실패', 'warning');
      } else if (e instanceof Error) {
        makeToast(e.message, 'warning');
      } else {
        makeToast('결제 고유 ID 발급 실패', 'warning');
      }

      setLoading(false);
      return;
    }

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

    window.IMP.init('imp84603310');
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
          makeToast('결제 성공! 검증 요청을 보냅니다.', 'success');
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
            console.error('verifyPayment 에러:', e);

            if (e && typeof e === 'object' && 'response' in e) {
              const axiosError = e as { response?: { data?: { message?: string } } };
              const errorMessage = axiosError.response?.data?.message;
              makeToast(errorMessage || '결제 검증 실패', 'warning');
            } else if (e instanceof Error) {
              makeToast(e.message, 'warning');
            } else {
              makeToast('결제 검증 실패', 'warning');
            }
          }
        }
        setLoading(false);
      },
    );
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
