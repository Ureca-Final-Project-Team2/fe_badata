'use client';

import { useEffect } from 'react';

import { X } from 'lucide-react';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { useAuthErrorStore } from '@/shared/lib/axios/authErrorStore';
import { LoginPrompt } from '@/shared/ui/AuthOverlay/LoginPrompt';

export const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, pendingUrl } = useAuthErrorStore();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  // 로그인 성공 시 모달 닫기
  useEffect(() => {
    if (isLoggedIn && isAuthModalOpen) {
      closeAuthModal();
    }
  }, [isLoggedIn, isAuthModalOpen, closeAuthModal]);

  const handleClose = () => {
    closeAuthModal();
  };

  const handleKakaoLogin = () => {
    // 원래 페이지 정보 저장
    if (pendingUrl) {
      localStorage.setItem('redirectTo', pendingUrl);
    } else {
      localStorage.setItem('redirectTo', window.location.pathname);
    }

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
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[var(--black)]/50">
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
