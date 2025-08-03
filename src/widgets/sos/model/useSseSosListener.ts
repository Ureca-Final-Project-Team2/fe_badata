import { useEffect } from 'react';

import { useAuthStore } from '@/entities/auth/model/authStore';

export const useSseSosListener = (onMessage: (data: string) => void) => {
  useEffect(() => {
    const token = useAuthStore.getState().accessToken;
    const controller = new AbortController();

    fetch('https://api.badata.store/sse/subscribe', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'text/event-stream',
      },
      signal: controller.signal,
    })
      .then((response) => {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder('utf-8');

        const read = async () => {
          try {
            while (true) {
              const { done, value } = await reader!.read();
              if (done) break;

              const chunk = decoder.decode(value, { stream: true });

              chunk.split('\n').forEach((line) => {
                if (line.startsWith('data:')) {
                  const data = line.replace(/^data:\s*/, '').trim();
                  onMessage(data);
                }
              });
            }
          } catch (err) {
            if (err instanceof DOMException && err.name === 'AbortError') {
              console.log('ℹ️ SSE 연결이 정상적으로 중단되었습니다 (AbortController)');
            } else {
              console.error('❌ SSE 수신 중 오류 발생:', err);
            }
          }
        };

        read();
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === 'AbortError') {
          console.log('ℹ️ SSE 연결이 사용자 요청으로 중단됨');
        } else {
          console.error('❌ SSE 연결 실패:', err);
        }
      });

    return () => controller.abort();
  }, [onMessage]);
};
