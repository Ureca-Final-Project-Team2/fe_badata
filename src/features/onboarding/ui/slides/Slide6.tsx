'use client';

import { OnboardingBackground } from '@/features/onboarding/ui/slides/OnboardingBackground';

interface Slide6Props {
  onComplete: () => void;
  onPrevious: () => void;
  onSkip: () => void;
}

export function Slide6({ onComplete, onPrevious, onSkip }: Slide6Props) {
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
            <div className="w-2 h-2 rounded-full bg-[var(--gray)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--gray)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--main-5)]" />
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
              src="/assets/onboarding/onboarding-slide-6.svg"
              alt="스마트 라이프"
              className="max-w-full max-h-full object-contain absolute"
            />
            <img
              src="/assets/onboarding/onboarding-slide-6-2-1.svg"
              alt="데이터"
              className="max-w-[30%] max-h-[30%] object-contain absolute top-4 right-2"
            />
            <img
              src="/assets/onboarding/onboarding-slide-6-3.svg"
              alt="혜택"
              className="max-w-[40%] max-h-[40%] object-contain absolute bottom-0 left-0"
            />
          </div>

          {/* 제목 */}
          <h1 className="font-title-bold text-[var(--black)] mb-4 mt-8">
            바다타와 함께하는
            <br />
            스마트한 모바일 라이프
          </h1>

          {/* 설명 */}
          <p className="font-label-medium text-[var(--gray-dark)] mb-8 leading-relaxed">
            카카오 로그인으로 간편하게 가입하고
            <br />
            다양한 혜택들을 누려보세요!
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
              onClick={onComplete}
              className="px-8 py-3 bg-[var(--main-5)] text-[var(--white)] rounded-full font-label-medium hover:bg-[var(--main-4)] transition-colors"
            >
              시작하기
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
