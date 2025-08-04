import { useEffect } from 'react';

import { useAuthStore } from '@/entities/auth/model/authStore';

export function useSseSosListener(onMessage: (data: string) => void) {
  useEffect(() => {
    let isCancelled = false;
    const controller = new AbortController();
    const token = useAuthStore.getState().accessToken;

    console.log('[SSE] 연결 시도 중...');
    if (!token) {
      console.warn('[SSE] accessToken 없음 → 연결 중단');
      return;
    }

    const connect = async () => {
      try {
        const res = await fetch('https://api.badata.store/sse/subscribe', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'text/event-stream',
          },
          signal: controller.signal,
        });

        console.log('[SSE] 응답 상태 코드:', res.status);

        const reader = res.body?.getReader();
        if (!reader) {
          console.error('[SSE] reader 생성 실패!');
          return;
        }

        console.log('[SSE] 연결 성공!');

        const decoder = new TextDecoder();

        while (!isCancelled) {
          const { value, done } = await reader.read();
          if (done || !value) break;

          const chunk = decoder.decode(value, { stream: true });
          console.log('📩 수신된 원시 chunk:', chunk); 
          const lines = chunk.split('\n').filter((line) => line.trim().startsWith('data:'));
          for (const line of lines) {
            const clean = line.replace(/^data:\s*/, '').trim();
            console.log('📡 [SSE] 수신:', clean); // ✅ 이 로그로 확인됨
            onMessage(clean);
          }
        }
      } catch (error) {
        console.error('❌ [SSE] 연결 실패:', error);
        setTimeout(() => {
          if (!isCancelled) {
            console.log('🔁 [SSE] 재연결 시도...');
            connect();
          }
        }, 3000);
      }
    };

    connect();

    return () => {
      isCancelled = true;
      controller.abort();
      console.log('🧹 [SSE] 연결 종료');
    };
  }, [onMessage]);
}
