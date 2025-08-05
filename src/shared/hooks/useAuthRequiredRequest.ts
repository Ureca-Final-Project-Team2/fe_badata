import { useCallback } from 'react';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { useAuthErrorStore } from '@/shared/lib/axios/authErrorStore';
import { requiresAuth } from '@/shared/lib/axios/authRequiredApis';

export const useAuthRequiredRequest = () => {
  const { isLoggedIn } = useAuthStore();
  const { openAuthModal } = useAuthErrorStore();

  const executeWithAuth = useCallback(
    async <T>(requestFn: () => Promise<T>, url: string): Promise<T | null> => {
      // 로그인이 필요한 API인지 확인
      if (requiresAuth(url)) {
        // 로그인하지 않은 경우
        if (!isLoggedIn) {
          // 원래 요청을 저장하고 모달 열기
          openAuthModal(async () => {
            try {
              return await requestFn();
            } catch (error) {
              console.error('Auth required request failed after login:', error);
              throw error;
            }
          }, url);
          return null; // 요청을 보내지 않고 null 반환
        }
      }

      // 로그인이 필요하지 않거나 이미 로그인된 경우 요청 실행
      return await requestFn();
    },
    [isLoggedIn, openAuthModal],
  );

  return { executeWithAuth };
};
