'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/entities/auth/model/authStore';

export const useSseSosListener = (onMessage: (data: string) => void) => {
  const token = useAuthStore.getState().accessToken;

  useEffect(() => {
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
          while (true) {
            const { done, value } = await reader!.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            chunk.split('\n').forEach((line) => {
              if (line.startsWith('data:')) {
                const rawData = line.replace(/^data:\s*/, '');
                onMessage(rawData); // ⬅️ 문자열 그대로 콜백 전달
              }
            });
          }
        };

        read();
      })
      .catch((err) => {
        console.error('❌ SSE 연결 실패:', err);
      });

    return () => controller.abort();
  }, [token, onMessage]);
};
