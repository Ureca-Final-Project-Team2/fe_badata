'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/entities/auth/model/authStore';

import type { SseNotification } from '../lib/types';

export const useSseSosListener = (onMessage: (data: SseNotification) => void) => {
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
          while (true) {
            const { done, value } = await reader!.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });

            chunk.split('\n').forEach((line) => {
              if (line.startsWith('data:')) {
                try {
                  const json = JSON.parse(line.replace(/^data:\s*/, ''));
                  console.log('📡 SSE 수신:', json);
                  onMessage(json);
                } catch {
                  console.error('❌ JSON 파싱 실패:', line);
                }
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
  }, [onMessage]);
};
