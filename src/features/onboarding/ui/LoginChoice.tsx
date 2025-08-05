'use client';

import { useState } from 'react';

import { useOnboarding } from '@/shared/hooks/useOnboarding';
import { KakaoLoginButton } from '@/shared/ui/KakaoLoginButton';

interface LoginChoiceProps {
  onComplete: () => void;
}

export function LoginChoice({ onComplete }: LoginChoiceProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const { completeOnboarding } = useOnboarding();

  const handleGuestMode = () => {
    // 온보딩 완료 처리
    completeOnboarding();
    localStorage.setItem('guestMode', 'true');

    // 홈으로 이동
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center px-8 text-center">
      {/* BADATA 로고 */}
      <div className="mb-12">
        <img src="/assets/logo-badata.png" alt="BADATA" className="w-80 h-80 mx-auto" />
      </div>

      {/* 버튼들 */}
      <div className="w-full max-w-sm space-y-4">
        {/* 카카오 로그인 버튼 (툴팁 포함) */}
        <div className="relative">
          <div
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="relative"
          >
            <KakaoLoginButton />
            {/* 툴팁 */}
            {showTooltip && (
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[var(--main-4)] text-[var(--white)] px-3 py-2 rounded-lg font-caption-medium whitespace-nowrap z-10">
                3초만에 시작하기
                {/* 툴팁 화살표 */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[var(--main-4)]"></div>
              </div>
            )}
          </div>
        </div>

        {/* 게스트 모드 버튼 */}
        <button
          onClick={handleGuestMode}
          className="w-full px-8 py-4 bg-[var(--main-4)] text-[var(--white)] rounded-full font-label-medium hover:bg-[var(--main-3)] transition-colors flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <span>둘러 보기</span>
        </button>
      </div>
    </div>
  );
}
