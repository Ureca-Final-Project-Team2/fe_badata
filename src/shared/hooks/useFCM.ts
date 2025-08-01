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
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeFCM = async () => {
    // 서버 사이드에서 실행되지 않도록 확인
    if (typeof window === 'undefined') return;

    console.log('FCM 초기화 시작');

    try {
      const permissionResult = await Notification.requestPermission();
      setPermission(permissionResult);
      console.log('알림 권한 상태:', permissionResult);

      if (permissionResult === 'granted') {
        console.log('Service Worker 등록 중...');
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);

        if (!messaging) {
          console.error('messaging 초기화 실패:', messaging);
          setToken({ token: '', error: 'messaging을 초기화할 수 없습니다.' });
          return;
        }

        console.log('FCM 토큰 발급 중...');
        const currentToken = await getToken(messaging, {
          vapidKey: VAPID_KEY,
          serviceWorkerRegistration: registration,
        });

        if (currentToken) {
          console.log('FCM 토큰 발급 완료:', currentToken);
          setToken({ token: currentToken });
          localStorage.setItem('fcm', currentToken);
        } else {
          console.log('FCM 토큰 발급 실패');
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

        setIsInitialized(true);
        return () => unsubscribe();
      } else {
        console.log('알림 권한이 거부됨');
        setToken({ token: '', error: '알림 권한이 거부되었습니다.' });
        setIsInitialized(true);
      }
    } catch (err) {
      console.error('FCM 초기화 실패:', err);
      setToken({ token: '', error: 'FCM 초기화 중 오류가 발생했습니다.' });
      setIsInitialized(true);
    }
  };

  // 수동으로 FCM 토큰 발급 트리거
  const triggerFCMToken = async () => {
    console.log('FCM 토큰 발급 트리거 시작');

    // 토큰이 없거나 초기화되지 않았으면 FCM 초기화 실행
    if (!token.token || !isInitialized) {
      console.log('FCM 초기화 실행');
      await initializeFCM();
    } else {
      console.log('이미 FCM 토큰이 발급되어 있습니다:', token.token);
    }
  };

  // 로그인 완료 후 FCM 토큰을 서버에 저장
  const sendFCMTokenToServer = async () => {
    if (token.token) {
      try {
        console.log('로그인 완료 후 FCM 토큰 서버 저장 중...');
        await fetchFcmToken(token.token);
        console.log('FCM 토큰이 서버에 저장되었습니다.');
      } catch (error) {
        console.error('FCM 토큰 저장 실패:', error);
      }
    } else {
      console.log('FCM 토큰이 아직 발급되지 않았습니다.');
    }
  };

  useEffect(() => {
    initializeFCM();
  }, []);

  return {
    token: token.token,
    tokenError: token.error,
    message,
    permission,
    isInitialized,
    triggerFCMToken,
    sendFCMTokenToServer,
    clearMessage: () => setMessage(null),
  };
};
