'use client';

import { useState } from 'react';

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

const VAPID_KEY = process.env.NEXT_PUBLIC_VAPID_KEY;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

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

  // ✅ 직접 호출해서 토큰 받아올 수 있는 함수
  const triggerFCMToken = async (): Promise<string | null> => {
    try {
      const permissionResult = await Notification.requestPermission();
      setPermission(permissionResult);

      if (permissionResult !== 'granted') return null;

      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      const app = initializeApp(firebaseConfig);
      const messaging = getMessaging(app);

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
    triggerFCMToken, // ✅ export
  };
};
