'use client';

import { OnboardingBackground } from '@/features/onboarding/ui/slides/OnboardingBackground';

interface Slide4Props {
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
}

export function Slide4({ onNext, onPrevious, onSkip }: Slide4Props) {
  return (
    <OnboardingBackground>
      <div className="flex flex-col">
        {/* 헤더 */}
        <div className="flex justify-between items-center p-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-[var(--gray)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--gray)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--gray)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--gray)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--main-5)]" />
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
          <div className="w-96 h-96 flex items-center justify-center mt-14 relative">
            <img
              src="/assets/onboarding/onboarding-slide-4-1.svg"
              alt="지도"
              className="max-w-full max-h-full object-contain absolute"
            />
            <img
              src="/assets/onboarding/onboarding-slide-4-2.svg"
              alt="와이파이 도시락"
              className="max-w-full max-h-full object-contain absolute top-0 -left-6"
            />
            <img
              src="/assets/onboarding/onboarding-slide-4-3.svg"
              alt="와이파이 공유기"
              className="max-w-full max-h-full object-contain absolute bottom-0 right-0"
            />
          </div>

          {/* 제목 */}
          <h1 className="font-title-bold text-[var(--black)] mb-4 mt-13">
            내 주변 공유기 대여도 OK
          </h1>

          {/* 설명 */}
          <p className="font-label-medium text-[var(--gray-dark)] mb-12 leading-relaxed">
            LG U+ 가맹점 기반으로 가까운 공유기를 찾고
            <br />
            원하는 시간에 예약할 수 있어요
          </p>

          {/* 네비게이션 버튼 */}
          <div className="flex items-center space-x-4">
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
