'use client';

import { OnboardingBackground } from '@/features/onboarding/ui/slides/OnboardingBackground';
import { ProgressIndicator } from '@/features/onboarding/ui/slides/ProgressIndicator';

interface Slide3Props {
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
}

const TOTAL_SLIDES = 7;
const CURRENT_SLIDE = 4;

export function Slide3({ onNext, onPrevious, onSkip }: Slide3Props) {
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
            {/* 메인 이미지 (영화 클래퍼보드) */}
            <div className="absolute -top-15 left-1/2 transform -translate-x-1/2 w-50 h-50">
              <img
                src="/assets/onboarding/onboarding-slide-3-1.svg"
                alt="영화 클래퍼보드"
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* 아이스크림 (왼쪽 하단) */}
            <div className="absolute bottom-0 -left-10 w-40 h-40">
              <img
                src="/assets/onboarding/onboarding-slide-3-2.svg"
                alt="아이스크림"
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* 크루아상 (오른쪽 하단) */}
            <div className="absolute bottom-4 -right-10 w-40 h-40">
              <img
                src="/assets/onboarding/onboarding-slide-3-3.svg"
                alt="크루아상"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* 제목과 설명 - 이미지 아래 고정 위치 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center mt-70 z-10">
          {/* 제목 */}
          <h1 className="font-body-semibold text-[var(--black)] text-xl mb-4">
            기프티콘 거래도 쉽고 안전하게
          </h1>

          {/* 설명 */}
          <p className="font-caption-medium text-[var(--gray-dark)] leading-relaxed">
            OCR 자동 인식으로 번거로움 없이 등록하고
            <br />
            검증된 사용자와 안전하게 거래하세요
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
