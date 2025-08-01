'use client';

import { useEffect, useState } from 'react';

import { getToken, messaging, onMessage } from '@/shared/lib/firebase'; // ✅ 여기만 import

const VAPID_KEY = process.env.NEXT_PUBLIC_VAPID_KEY;

interface FCMToken {
  token: string;
  error?: string;
}

interface FCMessage {
  title?: string;
  body?: string;
  data?: Record<string, unknown>;
}

export const useFCM = () => {
  const [token, setToken] = useState<FCMToken>({ token: '' });
  const [message, setMessage] = useState<FCMessage | null>(null);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('[포그라운드 메시지 수신]', payload);
      const { title, content } = payload.data || {};
      setMessage({
        title: title || '알림',
        body: content || '새로운 메시지가 도착했습니다!',
        data: payload.data,
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const triggerFCMToken = async (): Promise<string | null> => {
    try {
      const permissionResult = await Notification.requestPermission();
      setPermission(permissionResult);
      if (permissionResult !== 'granted') return null;

      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

      const currentToken = await getToken(messaging, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: registration,
      });

      if (currentToken) {
        setToken({ token: currentToken });
        return currentToken;
      } else {
        setToken({ token: '', error: '토큰을 가져올 수 없습니다.' });
        return null;
      }
    } catch (err) {
      console.error('FCM 토큰 발급 실패:', err);
      return null;
    }
  };

  return {
    token: token.token,
    tokenError: token.error,
    message,
    permission,
    clearMessage: () => setMessage(null),
    triggerFCMToken,
  };
};
