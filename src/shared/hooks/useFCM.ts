'use client';

import { useEffect, useState } from 'react';

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { toast } from 'sonner';

import { fetchFcmToken } from '@/entities/auth/api/apis';

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

  useEffect(() => {
    const initializeFCM = async () => {
      if (typeof window === 'undefined') return;

      try {
        const permissionResult = await Notification.requestPermission();
        setPermission(permissionResult);

        if (permissionResult === 'granted') {
          const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

          const app = initializeApp(firebaseConfig);
          const messaging = getMessaging(app);

          if (!messaging) {
            console.error('messaging 초기화 실패:', messaging);
            setToken({ token: '', error: 'messaging을 초기화할 수 없습니다.' });
            return;
          }

          const currentToken = await getToken(messaging, {
            vapidKey: VAPID_KEY,
            serviceWorkerRegistration: registration,
          });

          if (currentToken) {
            console.log('[✅ FCM 토큰 발급 완료]', currentToken);
            setToken({ token: currentToken });

            // ✅ FCM 토큰을 서버에 전송
            try {
              await fetchFcmToken(currentToken);
            } catch (err) {
              console.error('[ FCM 토큰 서버 전송 실패]', err);
            }
          } else {
            setToken({ token: '', error: '토큰을 가져올 수 없습니다.' });
          }

          const unsubscribe = onMessage(messaging, (payload) => {
            const newMessage = {
              title: payload.data?.title,
              body: payload.data?.content,
              data: payload.data,
            };
            setMessage(newMessage);
            toast.success(`알림 도착: ${payload.data?.title}\n${payload.data?.content}`);
          });

          return () => unsubscribe();
        } else {
          setToken({ token: '', error: '알림 권한이 거부되었습니다.' });
        }
      } catch (err) {
        console.error('FCM 초기화 실패:', err);
        setToken({ token: '', error: 'FCM 초기화 중 오류가 발생했습니다.' });
      }
    };

    initializeFCM();
  }, []);

  return {
    token: token.token,
    tokenError: token.error,
    message,
    permission,
    clearMessage: () => setMessage(null),
  };
};
