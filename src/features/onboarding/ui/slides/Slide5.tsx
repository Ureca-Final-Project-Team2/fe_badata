'use client';

import { OnboardingBackground } from './OnboardingBackground';

interface Slide5Props {
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
}

export function Slide5({ onNext, onPrevious, onSkip }: Slide5Props) {
  return (
    <OnboardingBackground>
      <div className="flex flex-col">
        {/* 헤더 */}
        <div className="flex justify-between items-center p-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
          </div>
          <button
            onClick={onSkip}
            className="text-gray-600 text-sm font-medium hover:text-gray-800 transition-colors"
          >
            건너뛰기
          </button>
        </div>

        {/* 슬라이드 내용 */}
        <div className="flex-1 flex flex-col items-center px-8 text-center">
          {/* 이미지 - 동심원 중심에 위치 */}
          <div
            className="w-96 h-96 flex items-center justify-center"
            style={{ marginTop: '110px' }}
          >
            <img
              src="/assets/onboarding/onboarding-slide-5-1.svg"
              alt="코인 적립 및 사용"
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* 제목 */}
          <h1 className="text-2xl font-bold text-gray-800 mb-4 mt-8">적립한 코인으로 할인 받자!</h1>

          {/* 설명 */}
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            리뷰 남길 수록 늘어 나는 코인!
            <br />
            적립한 코인을 사용해서
            <br />
            데이터와 기프티콘을 구입할 수 있어요
          </p>

          {/* 네비게이션 버튼 */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onPrevious}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              이전
            </button>
            <button
              onClick={onNext}
              className="px-8 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors"
            >
              다음
            </button>
          </div>
        </div>

        {/* 스와이프 힌트 */}
        <div className="p-6 text-center">
          <p className="text-sm text-gray-500">좌우로 스와이프하여 넘기세요</p>
        </div>
      </div>
    </OnboardingBackground>
  );
}
