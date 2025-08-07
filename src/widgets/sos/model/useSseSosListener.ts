import { useEffect } from 'react';

import { useAuthStore } from '@/entities/auth/model/authStore';

let hasConnected = false; // 전역 상태로 중복 연결 방지

export function useSseSosListener(onMessage: (data: string) => void) {
  useEffect(() => {
    let isCancelled = false;
    const controller = new AbortController();
    const token = useAuthStore.getState().accessToken;

    if (hasConnected) {
      console.log('[SSE] 이미 연결됨 → 중복 연결 방지');
      return;
    }

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
        hasConnected = true; // ✅ 연결 성공 시 플래그 설정

        const decoder = new TextDecoder();

        while (!isCancelled) {
          const { value, done } = await reader.read();
          if (done || !value) break;

          const chunk = decoder.decode(value, { stream: true });
          console.log('📩 수신된 원시 chunk:', chunk);

          const lines = chunk.split('\n').filter((line) => line.trim().startsWith('data:'));

          for (const line of lines) {
            const clean = line.replace(/^data:\s*/, '').trim();
            console.log('📡 [SSE] 수신:', clean);
            onMessage(clean);
          }
        }
      } catch (error) {
        console.error('❌ [SSE] 연결 실패:', error);

        // ❗ 연결 실패했을 경우에만 재시도 (연결이 끊긴 경우에만 플래그 해제)
        hasConnected = false;

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
      hasConnected = false; // ✅ 컴포넌트 언마운트 시 연결 해제
      console.log('🧹 [SSE] 연결 종료');
    };
  }, [onMessage]);
}
