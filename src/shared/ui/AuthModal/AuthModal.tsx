'use client';

import { useEffect } from 'react';

import { Coins, Star, X } from 'lucide-react';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { useAuthErrorStore } from '@/shared/lib/axios/authErrorStore';
import { Modal } from '@/shared/ui/Modal/Modal';

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

  return (
    <Modal isOpen={isAuthModalOpen} onClose={handleClose} className="max-w-[400px]">
      <div className="relative bg--[var(--white)] rounded-2xl overflow-hidden">
        {/* 헤더 배경 */}
        <div className="bg-gradient-to-r from-[var(--main-3)] to-[var(--main-4)] px-6 pt-8 pb-6 relative">
          {/* X 버튼 */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 hover:bg-[var(--white)]/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-[var(--white)]" />
          </button>

          <div className="text-center text-[var(--white)]">
            <h2 className="font-body-semibold mb-2">어? 잠깐! 🙋‍♀️</h2>
            <p className="font-small-semibold opacity-90">
              로그인하고 더 많은 기능을 이용해보세요!
            </p>
          </div>
        </div>

        {/* 콘텐츠 */}
        <div className="px-6 py-6">
          {/* 혜택 안내 */}
          <div className="mb-6">
            <h3 className="font-small-semibold text-[var(--black)] mb-4 text-center">
              로그인하면 이런 혜택이 있어요! ✨
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-[var(--main-1)] rounded-lg">
                <div className="w-8 h-8 bg-[var(--main-4)] rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-[var(--white)]" />
                </div>
                <div>
                  <p className="font-small-semibold text-[var(--black)]">거래 게시물 맞춤 추천</p>
                  <p className="text-xs text-[var(--gray-dark)]">
                    나에게 딱 맞는 거래를 찾아드려요
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[var(--main-1)] rounded-lg">
                <div className="w-8 h-8 bg-[var(--main-5)] rounded-full flex items-center justify-center flex-shrink-0">
                  <Coins className="w-4 h-4 text-[var(--white)]" />
                </div>
                <div>
                  <p className="font-small-medium text-[var(--black)] text-sm">리워드 코인 사용</p>
                  <p className="text-xs text-[var(--gray-dark)]">
                    활동하며 쌓은 코인으로 혜택을 받아요
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 로그인 버튼 */}
          <button
            onClick={handleKakaoLogin}
            className="w-full h-12 bg-yellow-400 hover:bg-yellow-300 text-[var(--black)] font-semibold rounded-xl transition-colors shadow-sm"
          >
            카카오로 3초만에 시작하기
          </button>

          <p className="text-xs text-[var(--gray-mid)] text-center mt-3">
            간편하고 안전한 카카오 로그인으로 시작해보세요
          </p>
        </div>
      </div>
    </Modal>
  );
};
