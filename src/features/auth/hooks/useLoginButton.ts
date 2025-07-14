'use client';

import { useAuthStore } from '@/features/auth/stores/authStore';
import { useKakaoLogin } from '@/features/auth/hooks/useKakaoLogin';

export const useLoginButton = () => {
  const { isLoggedIn, logout } = useAuthStore();
  const kakaoLogin = useKakaoLogin();

  const handleClick = () => {
    if (isLoggedIn) {
      logout();
    } else {
      kakaoLogin();
    }
  };

  return {
    isLoggedIn,
    handleClick,
  };
};
