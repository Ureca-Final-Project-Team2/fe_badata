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
        <div className="flex-1 flex flex-col items-center px-8 text-center relative">
          {/* 물방울 애니메이션 - 전체 화면 */}
          <div className="fixed bottom-0 left-0 right-0 h-screen overflow-hidden pointer-events-none">
            {/* 물방울들 */}
            <div
              className="absolute bottom-0 left-1/4 w-3 h-3 bg-blue-400/60 rounded-full animate-bubble"
              style={{ animation: 'bubble 4s ease-in-out infinite' }}
            ></div>
            <div
              className="absolute bottom-0 left-1/3 w-2 h-2 bg-blue-500/70 rounded-full animate-bubble"
              style={{ animation: 'bubble 3.5s ease-in-out infinite 0.5s' }}
            ></div>
            <div
              className="absolute bottom-0 left-1/2 w-4 h-4 bg-blue-600/50 rounded-full animate-bubble"
              style={{ animation: 'bubble 4.5s ease-in-out infinite 1s' }}
            ></div>
            <div
              className="absolute bottom-0 left-2/3 w-2.5 h-2.5 bg-blue-400/65 rounded-full animate-bubble"
              style={{ animation: 'bubble 3.8s ease-in-out infinite 1.5s' }}
            ></div>
            <div
              className="absolute bottom-0 left-3/4 w-3.5 h-3.5 bg-blue-500/55 rounded-full animate-bubble"
              style={{ animation: 'bubble 4.2s ease-in-out infinite 2s' }}
            ></div>

            {/* 추가 물방울들 */}
            <div
              className="absolute bottom-0 left-1/6 w-2 h-2 bg-blue-600/60 rounded-full animate-bubble"
              style={{ animation: 'bubble 3.2s ease-in-out infinite 0.8s' }}
            ></div>
            <div
              className="absolute bottom-0 left-5/6 w-3 h-3 bg-blue-400/70 rounded-full animate-bubble"
              style={{ animation: 'bubble 4.8s ease-in-out infinite 2.5s' }}
            ></div>

            {/* 더 많은 물방울들 */}
            <div
              className="absolute bottom-0 left-1/8 w-2.5 h-2.5 bg-blue-500/50 rounded-full animate-bubble"
              style={{ animation: 'bubble 3.6s ease-in-out infinite 1.2s' }}
            ></div>
            <div
              className="absolute bottom-0 left-7/8 w-3 h-3 bg-blue-600/55 rounded-full animate-bubble"
              style={{ animation: 'bubble 4.1s ease-in-out infinite 1.8s' }}
            ></div>
          </div>

          {/* 상단 바다타 로고 */}
          <div className="relative z-10 mt-20 mb-12">
            <img src="/assets/logo-badata.png" alt="BADATA" className="w-80 h-80" />
          </div>

          {/* 바다 거북이 (왼쪽) */}
          <div className="absolute left-3 top-3/5 transform -translate-y-1/2 z-10">
            <img
              src="/assets/onboarding/welcome-page-1.svg"
              alt="Sea turtle"
              className="w-50 h-50 opacity-80"
            />
          </div>

          {/* 고래 (오른쪽 하단) */}
          <div className="absolute -right-4 -bottom-4 z-10">
            <img
              src="/assets/onboarding/welcome-page-2.svg"
              alt="Whale"
              className="w-50 h-50 opacity-80"
            />
          </div>

          {/* 제목 */}
          <div className="relative z-10 mb-6">
            <h1 className="font-title-bold text-[var(--black)] text-2xl mb-2">
              바다타에 오신 분들
            </h1>
            <h2 className="font-title-bold text-[var(--black)] text-2xl">환영합니다</h2>
          </div>

          {/* 설명 */}
          <p className="font-label-medium text-[var(--gray-dark)] mb-12 leading-relaxed text-lg relative z-10">
            간단하게 바다타에 대해 알아볼까요?
          </p>

          {/* 시작하기 버튼 */}
          <button
            onClick={onNext}
            className="px-12 py-4 bg-[var(--main-5)] text-[var(--white)] rounded-full font-label-medium hover:bg-[var(--main-4)] transition-colors text-lg relative z-10"
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

        {/* 물방울 애니메이션 CSS */}
        <style jsx>{`
          @keyframes bubble {
            0% {
              transform: translateY(0) scale(0.8);
              opacity: 0;
            }
            20% {
              opacity: 1;
            }
            80% {
              opacity: 1;
            }
            100% {
              transform: translateY(-100vh) scale(1.2);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    </OnboardingBackground>
  );
}
