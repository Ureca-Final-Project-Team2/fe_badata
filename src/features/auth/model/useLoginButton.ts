'use client';

import { useAuthStore } from '@features/auth/model/authStore';
import { useKakaoLogin } from '@features/auth/model/useKakaoLogin';

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
