'use client';

import { OnboardingBackground } from '@/features/onboarding/ui/slides/OnboardingBackground';
import { ProgressIndicator } from '@/features/onboarding/ui/slides/ProgressIndicator';

interface Slide1Props {
  onNext: () => void;
  onSkip: () => void;
}

const TOTAL_SLIDES = 7;
const CURRENT_SLIDE = 2;

export function Slide1({ onNext, onSkip }: Slide1Props) {
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

        {/* 이미지 - 원 바로 위에 고정 위치 */}
        <div className="absolute inset-0 flex justify-center items-center -mt-52 z-10">
          <div className="w-65 h-65 flex items-center justify-center">
            <img
              src="/assets/onboarding/onboarding-slide-1.svg"
              alt="데이터 교환 서비스"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>

        {/* 제목과 설명 - 이미지 아래 고정 위치 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center mt-70 z-10">
          {/* 제목 */}
          <h1 className="font-body-semibold text-[var(--black)] mb-4">
            데이터 거래 플랫폼, 바다타!
          </h1>

          {/* 설명 */}
          <p className="font-caption-medium text-[var(--gray-dark)] leading-relaxed">
            잉여 데이터는 판매하고, 필요한 데이터는 원하는 만큼만!
            <br />
            바다타에서 자유롭게 거래해보세요
          </p>
        </div>

        {/* 네비게이션 버튼 */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex items-center space-x-4">
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
