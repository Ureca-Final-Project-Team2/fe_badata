'use client';

import { useEffect, useState } from 'react';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { KakaoLoginButton } from '@/shared/ui/KakaoLoginButton';

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
    return (
      <div className="relative w-full h-screen overflow-hidden">
        {/* 블러 처리된 원본 콘텐츠 - 높이 제한 */}
        <div className="filter blur-xs pointer-events-none opacity-50 h-screen overflow-hidden">
          {children}
        </div>

        {/* 로그인 프롬프트 오버레이 */}
        <div className="absolute inset-0 flex items-start justify-center z-50 pt-80">
          <div className="bg-[var(--main-1)]/80 backdrop-blur-sm rounded-lg p-8 max-w-sm w-full mx-4">
            <div className="text-center">
              <h2 className="font-body-semibold text-[var(--black)] mb-6">
                로그인이 필요한 서비스입니다
              </h2>
              <div className="flex justify-center">
                <KakaoLoginButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
