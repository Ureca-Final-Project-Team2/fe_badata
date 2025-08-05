'use client';

import { useKakaoLogin } from '@/entities/auth/model/useKakaoLogin';

export const KakaoLoginButton = () => {
  const handleLogin = useKakaoLogin();

  return (
    <button
      onClick={handleLogin}
      className="w-full px-8 py-4 bg-yellow-400 text-black rounded-full font-medium hover:bg-yellow-300 transition-colors flex items-center justify-center space-x-2"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
      <span>카카오로 로그인</span>
    </button>
  );
};
