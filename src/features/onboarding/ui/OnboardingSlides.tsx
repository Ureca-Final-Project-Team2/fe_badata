'use client';

import { useState } from 'react';

interface OnboardingSlidesProps {
  onComplete: () => void;
  onSkip: () => void;
}

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
  backgroundColor: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: '데이터 남거나 부족할 땐, 바다타',
    description: '남는 데이터는 바다타에서 판매하고\n부족할 때는 필요한 만큼 구매할 수 있어요',
    image: '/assets/logo-badata.png',
    backgroundColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
  },
  {
    id: 2,
    title: '급하게 필요할 땐, SOS!',
    description: '급한 상황에서 데이터 SOS 요청을 할 수 있어요.\n바다타 유저들이 도와드릴거에요',
    image: '/assets/logo-sos.svg',
    backgroundColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
  },
  {
    id: 3,
    title: '기프티콘 거래도 쉽고 안전하게',
    description: 'OCR 자동 인식으로 번거로움 없이 등록하고\n검증된 사용자와 안전하게 거래하세요',
    image: '/assets/gifticon/Gifticon_Default.svg',
    backgroundColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
  },
  {
    id: 4,
    title: '내 주변 공유기 대여도 OK',
    description: 'LG U+ 가맹점 기반으로 가까운 공유기를 찾고\n원하는 시간에 예약할 수 있어요',
    image: '/assets/data/Data_Default.png',
    backgroundColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
  },
  {
    id: 5,
    title: '적립한 코인으로 할인 받자!',
    description:
      '리뷰 남길 수록 늘어 나는 코인!\n적립한 코인을 사용해서\n데이터와 기프티콘을 구입할 수 있어요',
    image: '/assets/gifticon/Gifticon_Default.svg',
    backgroundColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
  },
  {
    id: 6,
    title: '바다타와 스마트한 모바일 라이프 시작하기',
    description: '카카오 로그인으로 간편하게 가입하고\n다양한 혜택들을 누려보세요!',
    image: '/assets/logo-badata.png',
    backgroundColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
  },
];

export function OnboardingSlides({ onComplete, onSkip }: OnboardingSlidesProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSkip = () => {
    onSkip();
  };

  const currentSlideData = slides[currentSlide];
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className={`min-h-screen ${currentSlideData.backgroundColor} flex flex-col`}>
      {/* 헤더 */}
      <div className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        <button
          onClick={handleSkip}
          className="text-gray-600 text-sm font-medium hover:text-gray-800 transition-colors"
        >
          건너뛰기
        </button>
      </div>

      {/* 슬라이드 내용 */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        {/* 이미지 */}
        <div className="w-48 h-48 mb-8 flex items-center justify-center">
          <img
            src={currentSlideData.image}
            alt={currentSlideData.title}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* 제목 */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{currentSlideData.title}</h1>

        {/* 설명 */}
        <p className="text-lg text-gray-600 mb-12 leading-relaxed">
          {currentSlideData.description}
        </p>

        {/* 네비게이션 버튼 */}
        <div className="flex items-center space-x-4">
          {currentSlide > 0 && (
            <button
              onClick={handlePrevious}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              이전
            </button>
          )}

          <button
            onClick={handleNext}
            className="px-8 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors"
          >
            {isLastSlide ? '시작하기' : '다음'}
          </button>
        </div>
      </div>

      {/* 스와이프 힌트 */}
      <div className="p-6 text-center">
        <p className="text-sm text-gray-500">좌우로 스와이프하여 넘기세요</p>
      </div>
    </div>
  );
}
