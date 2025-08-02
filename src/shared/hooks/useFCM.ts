'use client';

import { useEffect, useState } from 'react';

import { getToken } from 'firebase/messaging';

import { initMessaging, onFirebaseMessage } from '@/shared/lib/firebase';

interface MessagePayload {
  title: string;
  body: string;
}

export const useFCM = () => {
  const [token, setToken] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [permission, setPermission] = useState<NotificationPermission>();
  const [isInitialized, setIsInitialized] = useState(false);
  const [message, setMessage] = useState<MessagePayload | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  const triggerFCMToken = async (): Promise<string | null> => {
    const messaging = await initMessaging();
    if (!messaging) {
      console.warn('❌ FCM messaging 초기화 실패');
      return null;
    }

    try {
      const currentToken = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      });

      if (currentToken) {
        console.log('✅ FCM 토큰 발급 성공:', currentToken);
        setToken(currentToken);
        return currentToken;
      } else {
        setTokenError('토큰 없음');
        return null;
      }
    } catch (err) {
      console.error('❌ FCM 토큰 발급 중 오류 발생:', err);
      setTokenError('토큰 발급 실패');
      return null;
    }
  };

  useEffect(() => {
    const setupMessaging = async () => {
      const messaging = await initMessaging();
      if (!messaging) {
        console.warn('💥 FCM messaging not supported or unavailable');
        return;
      }

      console.log('✅ FCM onMessage 등록 시작');
      const unsubscribe = onFirebaseMessage(messaging, (payload) => {
        console.log('📩 포그라운드 메시지 수신:', payload);
        setMessage({
          title: payload.notification?.title ?? payload.data?.title ?? '알림',
          body: payload.notification?.body ?? payload.data?.content ?? '',
        });
        setShowNotification(true); // ✅ 알림 표시
      });

      return () => unsubscribe();
    };

    setupMessaging();
    setPermission(Notification.permission);
    setIsInitialized(true);
  }, []);

  return {
    token,
    tokenError,
    message,
    clearMessage: () => setMessage(null),
    permission,
    isInitialized,
    showNotification,
    setShowNotification,
    triggerFCMToken,
  };
};
