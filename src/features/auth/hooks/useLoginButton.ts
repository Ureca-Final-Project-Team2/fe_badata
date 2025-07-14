'use client';

import { useAuthStore } from '@/features/auth/stores/authStore';
import { useKakaoLogin } from '@/features/auth/hooks/useKakaoLogin';

export const useLoginButton = () => {
  const { isLoggedIn, logout } = useAuthStore();
  const kakaoLogin = useKakaoLogin(); // 카카오 로그인 함수 불러오기

  const handleClick = async () => {
    if (isLoggedIn) {
      await logout(); // 로그아웃 처리 (API 호출 포함)
    } else {
      kakaoLogin(); // 카카오 로그인 진행
    }
  };

  return {
    isLoggedIn,
    handleClick,
  };
};
