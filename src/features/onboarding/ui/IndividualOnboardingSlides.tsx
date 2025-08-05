'use client';

import { useState } from 'react';

import { Slide1, Slide2, Slide3, Slide4, Slide5, Slide6 } from '@/features/onboarding/ui/slides';

interface IndividualOnboardingSlidesProps {
  onComplete: () => void;
}

const TOTAL_SLIDES = 6; // Slide1~Slide6 = 6개 슬라이드

export function IndividualOnboardingSlides({ onComplete }: IndividualOnboardingSlidesProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < TOTAL_SLIDES - 1) {
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
    // 건너뛰기 시 위치 권한 페이지로 이동
    onComplete();
  };

  const renderSlide = () => {
    switch (currentSlide) {
      case 0:
        return <Slide1 onNext={handleNext} onSkip={handleSkip} />;
      case 1:
        return <Slide2 onNext={handleNext} onPrevious={handlePrevious} onSkip={handleSkip} />;
      case 2:
        return <Slide3 onNext={handleNext} onPrevious={handlePrevious} onSkip={handleSkip} />;
      case 3:
        return <Slide4 onNext={handleNext} onPrevious={handlePrevious} onSkip={handleSkip} />;
      case 4:
        return <Slide5 onNext={handleNext} onPrevious={handlePrevious} onSkip={handleSkip} />;
      case 5:
        return <Slide6 onComplete={onComplete} onPrevious={handlePrevious} onSkip={handleSkip} />;
      default:
        return <Slide1 onNext={handleNext} onSkip={handleSkip} />;
    }
  };

  return <>{renderSlide()}</>;
}
