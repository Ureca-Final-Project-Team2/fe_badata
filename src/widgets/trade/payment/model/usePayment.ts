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

  const handlePayment = async () => {
    setLoading(true);

    let merchant_uid = '';
    try {
      const res = await createPayment(postId);
      console.log('createPayment 응답:', res);
      merchant_uid = res.merchantUid;
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

    window.IMP.init('imp84603310');
    window.IMP.request_pay(
      {
        channelKey: process.env.NEXT_PUBLIC_IAMPORT_CHANNEL_KEY!,
        pay_method: 'CARD',
        merchant_uid,
        name: title,
        amount: price,
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

  return { loading, isPaid, handlePayment, isDrawerOpen, closeDrawer };
}
