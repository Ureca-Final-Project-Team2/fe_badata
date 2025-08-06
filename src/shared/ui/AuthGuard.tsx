'use client';

import { useEffect, useState } from 'react';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { LoginPrompt } from '@/shared/ui/AuthOverlay/LoginPrompt';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AuthGuard = ({ children, fallback }: AuthGuardProps) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      setIsChecking(false);
    } else {
      setIsChecking(false);
    }
  }, [isLoggedIn]);

  if (isChecking) {
    return (
      fallback || (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>로그인 확인 중...</p>
          </div>
        </div>
      )
    );
  }

  if (!isLoggedIn) {
    const handleKakaoLogin = () => {
      // 카카오 로그인 실행
      const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
      const REDIRECT_URI =
        process.env.NODE_ENV === 'production'
          ? process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI_RELEASE
          : process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
      const AUTH_URL = process.env.NEXT_PUBLIC_KAKAO_AUTH_URL;

      if (!REST_API_KEY || !REDIRECT_URI || !AUTH_URL) {
        console.error('카카오 로그인 환경변수 누락');
        return;
      }

      // 현재 페이지 정보 저장
      localStorage.setItem('redirectTo', window.location.pathname);

      const kakaoAuthUrl = `${AUTH_URL}?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
      window.location.href = kakaoAuthUrl;
    };

    return (
      <div className="relative w-full h-screen overflow-hidden">
        {/* 블러 처리된 원본 콘텐츠 - 높이 제한 */}
        <div className="filter blur-xs pointer-events-none opacity-50 h-screen overflow-hidden">
          {children}
        </div>

        {/* 로그인 프롬프트 오버레이 */}
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <LoginPrompt onLogin={handleKakaoLogin} />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
