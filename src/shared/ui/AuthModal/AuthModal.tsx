'use client';

import { useEffect } from 'react';

import { usePathname } from 'next/navigation';

import { X } from 'lucide-react';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { useAuthErrorStore } from '@/shared/lib/axios/authErrorStore';
import { LoginPrompt } from '@/shared/ui/AuthOverlay/LoginPrompt';

export const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, executePendingRequest, clearPendingNavigation } =
    useAuthErrorStore();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const pathname = usePathname();

  // 홈/마이페이지에서는 z-index를 낮게, 다른 페이지에서는 높게 설정
  const isHomeOrMypage = pathname === '/' || pathname === '/mypage';
  const zIndex = isHomeOrMypage ? 'z-40' : 'z-70';

  // 로그인 성공 시 모달 닫기 및 원래 요청 실행
  useEffect(() => {
    if (isLoggedIn && isAuthModalOpen) {
      // 로그인 성공 후 원래 요청 실행 (API 요청 또는 네비게이션)
      executePendingRequest();
    }
  }, [isLoggedIn, isAuthModalOpen, executePendingRequest]);

  const handleClose = () => {
    // 모달을 닫을 때 pendingNavigation 정리 (로그인하지 않고 닫은 경우)
    clearPendingNavigation();
    closeAuthModal();
  };

  const handleKakaoLogin = () => {
    // 게시물 등록 페이지에서는 /trade로 리다이렉트, 그 외에는 현재 페이지 경로 사용
    const currentPath = window.location.pathname;
    const isRegisterPage = currentPath.includes('/trade/register');
    const redirectPath = isRegisterPage ? '/trade' : currentPath;
    localStorage.setItem('redirectTo', redirectPath);

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

    const kakaoAuthUrl = `${AUTH_URL}?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
    window.location.href = kakaoAuthUrl;
  };

  if (!isAuthModalOpen) return null;

  return (
    // 1번과 완전히 동일한 구조
    <div
      className={`fixed inset-0 ${zIndex} flex items-center justify-center bg-[var(--black)]/50`}
    >
      <div className="relative">
        {/* X 버튼 */}
        <button
          onClick={handleClose}
          className="cursor-pointer absolute top-4 right-4 p-2 hover:bg-[var(--white)]/20 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5 text-[var(--white)]" />
        </button>

        <LoginPrompt onLogin={handleKakaoLogin} />
      </div>
    </div>
  );
};
