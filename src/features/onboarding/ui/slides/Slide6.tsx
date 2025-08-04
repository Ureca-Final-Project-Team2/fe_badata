'use client';

import { OnboardingBackground } from './OnboardingBackground';

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
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-blue-500" />
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
              src="/assets/onboarding/onboarding-slide-1.svg"
              alt="바다타 시작하기"
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* 제목 */}
          <h1 className="text-2xl font-bold text-gray-800 mb-4 mt-8">
            바다타와 스마트한 모바일 라이프 시작하기
          </h1>

          {/* 설명 */}
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            카카오 로그인으로 간편하게 가입하고
            <br />
            다양한 혜택들을 누려보세요!
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
              onClick={onComplete}
              className="px-8 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors"
            >
              시작하기
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
