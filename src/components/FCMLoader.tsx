'use client';

import { useEffect } from 'react';

import { useFCM } from '@/shared/hooks/useFCM';
import { InAppNotification } from '@/shared/ui/InAppNotification';

export const FCMLoader = () => {
  const {
    token,
    tokenError,
    message,
    permission,
    isInitialized,
    showNotification,
    setShowNotification,
  } = useFCM();

  useEffect(() => {
    if (token) {
      if (process.env.NODE_ENV === 'development') {
        console.log('[FCM Token 발급 완료]', token);
      }
    }
    if (tokenError) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[FCM Token 에러]', tokenError);
      }
    }
    if (message) {
      if (process.env.NODE_ENV === 'development') {
        console.log('[실시간 메시지 수신]', message);
      }
    }
  }, [token, tokenError, message]);

  // 개발 환경에서 FCM 상태 디버깅
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[FCM 상태]', {
        token: token ? '발급됨' : '없음',
        permission,
        isInitialized,
        tokenError: tokenError || '없음',
      });

      // 알림 권한 확인
      if (permission === 'granted') {
        console.log('[알림 권한] 허용됨');
      } else if (permission === 'denied') {
        console.log('[알림 권한] 거부됨 - 브라우저 설정에서 허용 필요');
      } else {
        console.log('[알림 권한] 기본값 - 사용자가 아직 선택하지 않음');
      }
    }
  }, [token, permission, isInitialized, tokenError]);

  return (
    <>
      {showNotification && message && (
        <InAppNotification
          title={message.title || '알림'}
          content={message.body || '새로운 소식이 있습니다!'}
          onClose={() => {
            setShowNotification(false);
          }}
          duration={5000}
        />
      )}
    </>
  );
};

export default FCMLoader;
