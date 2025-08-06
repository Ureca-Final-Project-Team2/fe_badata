'use client';

import { OnboardingBackground } from '@/features/onboarding/ui/slides/OnboardingBackground';
import { ProgressIndicator } from '@/features/onboarding/ui/slides/ProgressIndicator';

interface Slide4Props {
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
}

const TOTAL_SLIDES = 7;
const CURRENT_SLIDE = 5;

export function Slide4({ onNext, onPrevious, onSkip }: Slide4Props) {
  return (
    <OnboardingBackground>
      <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center relative">
        {/* 헤더 */}
        <div className="absolute top-6 right-6 flex justify-end items-center z-20">
          <button
            onClick={onSkip}
            className="text-[var(--gray-dark)] font-caption-medium hover:text-[var(--black)] transition-colors"
          >
            건너뛰기
          </button>
        </div>

        {/* 이미지들 - 원 주위에 고정 위치 */}
        <div className="absolute inset-0 flex justify-center items-center -mt-52 z-10">
          <div className="relative w-65 h-65 flex items-center justify-center">
            {/* 지도 (원 위) */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-60 h-60">
              <img
                src="/assets/onboarding/onboarding-slide-4-1.svg"
                alt="지도"
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* 와이파이도시락 (좌상단) */}
            <div className="absolute -top-8 -left-20 w-40 h-40">
              <img
                src="/assets/onboarding/onboarding-slide-4-2.svg"
                alt="와이파이도시락"
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* 무선공유기 (우하단) */}
            <div className="absolute -bottom-8 -right-25 w-40 h-40">
              <img
                src="/assets/onboarding/onboarding-slide-4-3.svg"
                alt="무선공유기"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* 제목과 설명 - 이미지 아래 고정 위치 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center mt-70 z-10">
          {/* 제목 */}
          <h1 className="font-body-semibold text-[var(--black)] text-xl mb-4">
            내 주변 공유기 대여도 OK!
          </h1>

          {/* 설명 */}
          <p className="font-caption-medium text-[var(--gray-dark)] leading-relaxed">
            LG U+ 가맹점이라면 어디든 조건에 맞는 공유기를 찾고
            <br />
            원하는 시간에 예약할 수 있어요
          </p>
        </div>

        {/* 네비게이션 버튼 */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex items-center space-x-4">
          <button
            onClick={onPrevious}
            className="px-6 py-3 text-[var(--gray-dark)] font-label-medium hover:text-[var(--black)] transition-colors"
          >
            이전
          </button>
          <button
            onClick={onNext}
            className="px-8 py-3 bg-[var(--main-5)] text-[var(--white)] rounded-full font-label-medium hover:bg-[var(--main-4)] transition-colors"
          >
            다음
          </button>
        </div>

        {/* ProgressIndicator - 스와이프 힌트 위치 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <ProgressIndicator currentSlide={CURRENT_SLIDE} totalSlides={TOTAL_SLIDES} />
        </div>
      </div>
    </OnboardingBackground>
  );
}
