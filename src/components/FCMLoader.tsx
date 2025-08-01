'use client';

import { useEffect } from 'react';

import { useFCM } from '@/shared/hooks/useFCM';

export const FCMLoader = () => {
  const { token, tokenError, message } = useFCM();

  useEffect(() => {
    if (token) {
      console.log('[FCM Token 발급 완료]', token);
    }
    if (tokenError) {
      console.error('[FCM Token 에러]', tokenError);
    }
    if (message) {
      console.log('[실시간 메시지 수신]', message);
    }
  }, [token, tokenError, message]);

  return null;
};
