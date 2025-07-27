import { useState } from 'react';

import { createPayment, verifyPayment } from '@/widgets/trade/payment/api/apis';

import type { IamportRequestPayParams, IamportResponse } from '@/widgets/trade/payment/lib/types';

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

export function usePayment(postId: number, title: string, price: number) {
  const [loading, setLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCoinModalOpen, setIsCoinModalOpen] = useState(false);

  const handlePayment = async (useCoin: number = 0) => {
    setLoading(true);

    let merchant_uid = '';
    let finalAmount = price;

    try {
      // 실제 사용할 코인 금액 전달
      const res = await createPayment(postId, useCoin);
      console.log('createPayment 응답:', res);
      if (!res || typeof res !== 'object' || !('merchantUid' in res)) {
        alert('결제 고유 ID 응답이 올바르지 않습니다.');
        setLoading(false);
        return;
      }
      merchant_uid = res.merchantUid as string;
      // amount가 있으면 사용하고, 없으면 원래 가격 사용
      finalAmount = (res as unknown as { amount: number }).amount || price;
    } catch (e) {
      console.error('createPayment 에러:', e);
      alert('결제 고유 ID 발급 실패');
      setLoading(false);
      return;
    }

    if (!window.IMP) {
      alert('포트원 SDK 로드 실패');
      setLoading(false);
      return;
    }

    const channelKey = process.env.NEXT_PUBLIC_IAMPORT_CHANNEL_KEY;
    if (!channelKey) {
      alert('결제 설정 오류: 채널 키가 설정되지 않았습니다.');
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
          alert(`결제 실패: ${rsp.message}`);
        } else {
          alert('결제 성공! 검증 요청을 보냅니다.');
          try {
            const verifyRes = await verifyPayment(rsp.imp_uid!, postId);
            console.log('verifyPayment 응답:', verifyRes);
            setIsPaid(true);
            setIsDrawerOpen(true);
          } catch {
            alert('결제 검증 실패');
          }
        }
        setLoading(false);
      },
    );
  };

  const closeDrawer = () => setIsDrawerOpen(false);
  const openCoinModal = () => setIsCoinModalOpen(true);
  const closeCoinModal = () => setIsCoinModalOpen(false);

  return {
    loading,
    isPaid,
    handlePayment,
    isDrawerOpen,
    closeDrawer,
    isCoinModalOpen,
    openCoinModal,
    closeCoinModal,
  };
}
