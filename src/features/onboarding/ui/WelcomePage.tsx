'use client';

import { OnboardingBackground } from '@/features/onboarding/ui/slides/OnboardingBackground';

interface WelcomePageProps {
  onNext: () => void;
  onSkip: () => void;
}

export function WelcomePage({ onNext, onSkip }: WelcomePageProps) {
  return (
    <OnboardingBackground>
      <div className="flex flex-col">
        {/* 헤더 */}
        <div className="flex justify-between items-center p-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-[var(--main-5)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--gray)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--gray)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--gray)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--gray)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--gray)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--gray)]" />
          </div>
          <button
            onClick={onSkip}
            className="text-[var(--gray-dark)] font-caption-medium hover:text-[var(--black)] transition-colors"
          >
            건너뛰기
          </button>
        </div>

        {/* 슬라이드 내용 */}
        <div className="flex-1 flex flex-col items-center px-8 text-center">
          {/* 환영 아이콘 또는 이미지 */}
          <div className="w-32 h-32 bg-[var(--main-5)] rounded-full flex items-center justify-center mt-20 mb-8">
            <svg
              className="w-16 h-16 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>

          {/* 제목 */}
          <h1 className="font-title-bold text-[var(--black)] mb-6 text-2xl">
            바다타에 오신 분들 환영합니다
          </h1>

          {/* 설명 */}
          <p className="font-label-medium text-[var(--gray-dark)] mb-12 leading-relaxed text-lg">
            간단하게 바다타에 대해 알아볼까요?
          </p>

          {/* 시작하기 버튼 */}
          <button
            onClick={onNext}
            className="px-12 py-4 bg-[var(--main-5)] text-[var(--white)] rounded-full font-label-medium hover:bg-[var(--main-4)] transition-colors text-lg"
          >
            시작하기
          </button>
        </div>

        {/* 스와이프 힌트 */}
        <div className="p-6 text-center">
          <p className="font-caption-medium text-[var(--gray-dark)]">
            좌우로 스와이프하여 넘기세요
          </p>
        </div>
      </div>
    </OnboardingBackground>
  );
}
