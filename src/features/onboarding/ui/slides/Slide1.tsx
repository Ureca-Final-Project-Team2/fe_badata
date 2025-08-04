'use client';

import { OnboardingBackground } from '@/features/onboarding/ui/slides/OnboardingBackground';

interface Slide1Props {
  onNext: () => void;
  onSkip: () => void;
}

export function Slide1({ onNext, onSkip }: Slide1Props) {
  return (
    <OnboardingBackground>
      <div className="flex flex-col">
        {/* 헤더 */}
        <div className="flex justify-between items-center p-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-[var(--gray)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--main-5)]" />
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
          {/* 이미지 - 동심원 중심에 위치 */}
          <div className="w-96 h-96 flex mt-20 items-center justify-center">
            <img
              src="/assets/onboarding/onboarding-slide-1.svg"
              alt="데이터 교환 서비스"
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* 제목 */}
          <h1 className="font-title-bold text-[var(--black)] mb-4 mt-8">
            데이터 남거나 부족할 땐, 바다타
          </h1>

          {/* 설명 */}
          <p className="font-label-medium text-[var(--gray-dark)] mb-12 leading-relaxed">
            남는 데이터는 바다타에서 판매하고
            <br />
            부족할 때는 필요한 만큼 구매할 수 있어요
          </p>

          {/* 네비게이션 버튼 */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onNext}
              className="px-8 py-3 bg-[var(--main-5)] text-[var(--white)] rounded-full font-label-medium hover:bg-[var(--main-4)] transition-colors"
            >
              다음
            </button>
          </div>
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
