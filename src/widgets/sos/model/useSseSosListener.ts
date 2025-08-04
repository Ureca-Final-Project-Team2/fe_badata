import { useEffect } from 'react';

import { useAuthStore } from '@/entities/auth/model/authStore';

export const useSseSosListener = (onMessage: (data: string) => void) => {
  useEffect(() => {
    const token = useAuthStore.getState().accessToken;
    const controller = new AbortController();

    console.log('🔗 SSE 연결 시도 중...', { token: token ? '있음' : '없음' });

    fetch('https://api.badata.store/sse/subscribe', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'text/event-stream',
      },
      signal: controller.signal,
    })
      .then((response) => {
        console.log('✅ SSE 연결 성공:', response.status, response.statusText);
        
        if (!response.ok) {
          throw new Error(`SSE 연결 실패: ${response.status} ${response.statusText}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder('utf-8');

        const read = async () => {
          try {
            while (true) {
              const { done, value } = await reader!.read();
              if (done) {
                console.log('📡 SSE 스트림 종료');
                break;
              }

              const chunk = decoder.decode(value, { stream: true });
              console.log('📦 SSE 청크 수신:', chunk);

              chunk.split('\n').forEach((line) => {
                if (line.startsWith('data:')) {
                  const data = line.replace(/^data:\s*/, '').trim();
                  if (data) {
                    console.log('📨 SSE 메시지 전달:', data);
                    onMessage(data);
                  }
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

    return () => {
      console.log('🔌 SSE 연결 해제');
      controller.abort();
    };
  }, [onMessage]);
};
