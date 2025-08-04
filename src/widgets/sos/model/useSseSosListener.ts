import { useEffect } from 'react';

import { useAuthStore } from '@/entities/auth/model/authStore';

export function useSseSosListener(onMessage: (data: string) => void) {
  useEffect(() => {
    let isCancelled = false;
    const controller = new AbortController();

    const connect = async () => {
      const token = useAuthStore.getState().accessToken;

      if (!token) {
        console.warn('❌ [SSE] accessToken 없음. 연결 시도 중단');
        return;
      }

      try {
        const res = await fetch('https://api.badata.store/sse/subscribe', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'text/event-stream',
          },
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          console.error(`❌ [SSE] 연결 실패. 상태 코드: ${res.status}`);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        while (!isCancelled) {
          const { value, done } = await reader.read();
          if (done || !value) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n').filter((line) => line.trim().startsWith('data:'));

          for (const line of lines) {
            const clean = line.replace(/^data:\s*/, '').trim();
            onMessage(clean);
          }
        }
      } catch (error) {
        if (!isCancelled) {
          console.error('❌ [SSE] 연결 중 오류 발생:', error);
          setTimeout(() => {
            if (!isCancelled) {
              console.log('🔁 [SSE] 재연결 시도');
              connect();
            }
          }, 3000); // 3초 후 재시도
        }
      }
    };

    connect();

    return () => {
      isCancelled = true;
      controller.abort();
      console.log('🧹 [SSE] 연결 종료 및 정리 완료');
    };
  }, [onMessage]);
}
