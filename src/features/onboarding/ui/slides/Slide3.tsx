'use client';

import { OnboardingBackground } from './OnboardingBackground';

interface Slide3Props {
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
}

export function Slide3({ onNext, onPrevious, onSkip }: Slide3Props) {
  return (
    <OnboardingBackground>
      <div className="flex flex-col">
        {/* 헤더 */}
        <div className="flex justify-between items-center p-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
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
          {/* 이미지들 - 동심원 중심에 배치 */}
          <div
            className="relative w-96 h-96 flex items-center justify-center"
            style={{ marginTop: '30px' }}
          >
            {/* 아이스크림 (왼쪽 하단) */}
            <div className="absolute bottom-4 left-4 w-28 h-28">
              <img
                src="/assets/onboarding/onboarding-slide-3-1.svg"
                alt="아이스크림"
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* 영화 클래퍼보드 (상단 중앙) */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-24">
              <img
                src="/assets/onboarding/onboading-slide-3-2.svg"
                alt="영화 클래퍼보드"
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* 크루아상 (오른쪽 하단) */}
            <div className="absolute bottom-4 right-4 w-24 h-24">
              <img
                src="/assets/onboarding/onboading-slide-3-3.svg"
                alt="크루아상"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>

          {/* 제목 */}
          <h1 className="text-2xl font-bold text-gray-800 mb-4 mt-8">
            기프티콘 거래도 쉽고 안전하게
          </h1>

          {/* 설명 */}
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            OCR 자동 인식으로 번거로움 없이 등록하고
            <br />
            검증된 사용자와 안전하게 거래하세요
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
