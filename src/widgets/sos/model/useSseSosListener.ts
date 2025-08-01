import { useEffect } from 'react';

import { END_POINTS } from '@/shared/api/endpoints';

import { useSosNotificationStore } from './sosNotificationStore';

export const useSseSosListener = () => {
  const { setCurrentSosRequest, openResponseModal } = useSosNotificationStore();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.warn('❌ SSE 연결 실패: accessToken 없음');
      return;
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${END_POINTS.SOS.SSE_SUBSCRIBE}`;

    const eventSource = new EventSource(url); // 헤더 인증 대신 쿠키 기반 연결

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'SOS_REQUEST') {
          setCurrentSosRequest(data);
          openResponseModal();
        }

        if (data.type === 'SOS_RESPONSE') {
          console.log('📩 SOS 응답 수신:', data);
          // 요청자에게 결과 알림 토스트 처리 가능
        }
      } catch (err) {
        console.error('❌ SSE 메시지 파싱 실패:', err);
      }
    };

    eventSource.onerror = (err) => {
      console.error('🔌 SSE 연결 오류:', err);
      // 자동 재연결됨
    };

    return () => {
      eventSource.close();
    };
  }, [setCurrentSosRequest, openResponseModal]);
};
