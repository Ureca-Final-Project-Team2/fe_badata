'use client';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { useKakaoLogin } from '@/entities/auth/model/useKakaoLogin';

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
