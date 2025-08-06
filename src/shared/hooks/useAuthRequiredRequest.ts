import { useCallback } from 'react';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { requiresAuth } from '@/shared/lib/axios/authRequiredApis';

export const useAuthRequiredRequest = () => {
  const { isLoggedIn } = useAuthStore();

  const executeWithAuth = useCallback(
    async <T>(
      requestFn: () => Promise<T>,
      url: string,
      requestData: {
        type:
          | 'STORE_LIKE'
          | 'SOS_REQUEST'
          | 'POST_LIKE'
          | 'RESERVATION'
          | 'FOLLOW'
          | 'RESTOCK'
          | 'TRADE_POST';
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
        data?: unknown;
      },
      onAuthModalClose?: () => void,
    ): Promise<T | null> => {
      console.log('🔍 executeWithAuth 호출:', {
        url,
        isLoggedIn,
        requiresAuth: requiresAuth(url),
        requestType: requestData?.type,
      });

      // 로그인이 필요한 API인지 확인
      if (requiresAuth(url)) {
        // 로그인하지 않은 경우
        if (!isLoggedIn) {
          console.log('🔒 로그인 필요 - AuthModal 열기, API 요청은 하지 않음');

          try {
            // AuthErrorStore를 동적으로 import
            const { useAuthErrorStore } = await import('@/shared/lib/axios/authErrorStore');
            const { openAuthModal } = useAuthErrorStore.getState();

            // URL에서 API 타입 추정
            const apiType = determineApiType(url);

            // 원래 요청을 저장하고 AuthModal 열기
            openAuthModal(
              {
                type: requestData.type || apiType,
                url,
                method: requestData.method || 'POST',
                data: requestData.data,
              },
              onAuthModalClose,
            );

            // ✅ 중요: API 요청을 하지 않고 null 반환
            return null;
          } catch (error) {
            console.error('❌ AuthErrorStore import 실패:', error);
            return null;
          }
        }
      }

      // ✅ 로그인된 경우에만 실제 API 요청 실행
      console.log('🚀 로그인된 상태 - 직접 API 요청 실행');
      try {
        const result = await requestFn();
        console.log('✅ API 요청 성공:', { url, result: !!result });
        return result;
      } catch (error) {
        console.error('❌ API 요청 실패:', { url, error });
        throw error;
      }
    },
    [isLoggedIn],
  );

  return { executeWithAuth };
};

// URL을 기반으로 API 타입을 추정하는 함수
function determineApiType(
  url: string,
):
  | 'STORE_LIKE'
  | 'SOS_REQUEST'
  | 'POST_LIKE'
  | 'RESERVATION'
  | 'FOLLOW'
  | 'RESTOCK'
  | 'TRADE_POST' {
  if (url.includes('/stores/') && url.includes('/like')) {
    return 'STORE_LIKE';
  }
  if (url.includes('/sos/')) {
    return 'SOS_REQUEST';
  }
  if (url.includes('/trades/') && url.includes('/likes')) {
    return 'POST_LIKE';
  }
  if (url.includes('/rentals/devices')) {
    return 'RESERVATION';
  }
  if (url.includes('/follows')) {
    return 'FOLLOW';
  }
  if (url.includes('/restock')) {
    return 'RESTOCK';
  }
  if (url.includes('/trades/posts')) {
    return 'TRADE_POST';
  }

  // 기본값
  return 'RESERVATION';
}
