'use client';

import { OnboardingBackground } from '@/features/onboarding/ui/slides/OnboardingBackground';
import { ProgressIndicator } from '@/features/onboarding/ui/slides/ProgressIndicator';

interface WelcomePageProps {
  onNext: () => void;
  onSkip: () => void;
}

const TOTAL_SLIDES = 7;
const CURRENT_SLIDE = 1;

export function WelcomePage({ onNext, onSkip }: WelcomePageProps) {
  return (
    <OnboardingBackground>
      <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center relative">
        {/* 물방울 애니메이션 - 전체 화면 */}
        <div className="fixed bottom-0 left-0 right-0 h-screen overflow-hidden pointer-events-none">
          {/* 물방울들 */}
          <div
            className="absolute bottom-0 left-1/4 w-3 h-3 bg-blue-400/60 rounded-full animate-bubble"
            style={{ animation: 'bubble 8s ease-in-out infinite' }}
          ></div>
          <div
            className="absolute bottom-0 left-1/3 w-2 h-2 bg-blue-500/70 rounded-full animate-bubble"
            style={{ animation: 'bubble 7s ease-in-out infinite 1s' }}
          ></div>
          <div
            className="absolute bottom-0 left-1/2 w-4 h-4 bg-blue-600/50 rounded-full animate-bubble"
            style={{ animation: 'bubble 9s ease-in-out infinite 2s' }}
          ></div>
          <div
            className="absolute bottom-0 left-2/3 w-2.5 h-2.5 bg-blue-400/65 rounded-full animate-bubble"
            style={{ animation: 'bubble 7.5s ease-in-out infinite 3s' }}
          ></div>
          <div
            className="absolute bottom-0 left-3/4 w-3.5 h-3.5 bg-blue-500/55 rounded-full animate-bubble"
            style={{ animation: 'bubble 8.5s ease-in-out infinite 4s' }}
          ></div>

          {/* 추가 물방울들 */}
          <div
            className="absolute bottom-0 left-1/6 w-2 h-2 bg-blue-600/60 rounded-full animate-bubble"
            style={{ animation: 'bubble 6.5s ease-in-out infinite 1.5s' }}
          ></div>
          <div
            className="absolute bottom-0 left-5/6 w-3 h-3 bg-blue-400/70 rounded-full animate-bubble"
            style={{ animation: 'bubble 9.5s ease-in-out infinite 5s' }}
          ></div>

          {/* 더 많은 물방울들 */}
          <div
            className="absolute bottom-0 left-1/8 w-2.5 h-2.5 bg-blue-500/50 rounded-full animate-bubble"
            style={{ animation: 'bubble 7.2s ease-in-out infinite 2.5s' }}
          ></div>
          <div
            className="absolute bottom-0 left-7/8 w-3 h-3 bg-blue-600/55 rounded-full animate-bubble"
            style={{ animation: 'bubble 8.2s ease-in-out infinite 3.5s' }}
          ></div>
        </div>

        {/* 헤더 */}
        <div className="absolute top-6 right-6 flex justify-end items-center z-20">
          <button
            onClick={onSkip}
            className="text-[var(--gray-dark)] font-caption-medium hover:text-[var(--black)] transition-colors"
          >
            건너뛰기
          </button>
        </div>

        {/* BADATA 로고 - 원 안에 고정 위치 */}
        <div className="absolute inset-0 flex justify-center items-center -mt-52 z-10">
          <div className="w-70 h-70">
            <img
              src="/assets/logo-badata.png"
              alt="BADATA"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* 바다 거북이 - 고정 위치 */}
        <div className="absolute left-0 top-1/8 z-10">
          <img
            src="/assets/onboarding/welcome-page-1.svg"
            alt="Sea turtle"
            className="w-40 h-40 opacity-80"
          />
        </div>

        {/* 고래 - 고정 위치 */}
        <div className="absolute right-0 bottom-1/3 z-10">
          <img
            src="/assets/onboarding/welcome-page-2.svg"
            alt="Whale"
            className="w-40 h-40 opacity-80"
          />
        </div>

        {/* ProgressIndicator - 시작하기 버튼 아래 */}
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-20">
          <ProgressIndicator currentSlide={CURRENT_SLIDE} totalSlides={TOTAL_SLIDES} />
        </div>

        {/* 시작하기 버튼 */}
        <button
          onClick={onNext}
          className="fixed bottom-30 left-1/2 transform -translate-x-1/2 z-20 px-10 py-3 bg-[var(--main-5)] text-[var(--white)] rounded-full font-label-medium hover:bg-[var(--main-4)] transition-colors"
        >
          시작하기
        </button>

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
