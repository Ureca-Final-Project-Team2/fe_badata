'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { IndividualOnboardingSlides } from '@/features/onboarding/ui/IndividualOnboardingSlides';
import { IntroVideo } from '@/features/onboarding/ui/IntroVideo';
import { LocationPermission } from '@/features/onboarding/ui/LocationPermission';
import { LoginChoice } from '@/features/onboarding/ui/LoginChoice';
import { BaseLayout } from '@/shared/ui/BaseLayout';

type OnboardingStep = 'intro' | 'slides' | 'location' | 'login-choice';

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('intro');
  const router = useRouter();

  const handleNextStep = (step: OnboardingStep) => {
    setCurrentStep(step);
  };

  const handleComplete = () => {
    // 온보딩 완료 후 홈으로 이동
    router.push('/');
  };

  const handleSkip = () => {
    // 스킵 시 홈으로 이동
    router.push('/');
  };

  return (
    <BaseLayout header={null} paddingX={false} showBottomNav={false} showHeader={false}>
      {currentStep === 'intro' && (
        <IntroVideo onComplete={() => handleNextStep('slides')} onSkip={handleSkip} />
      )}

      {currentStep === 'slides' && (
        <IndividualOnboardingSlides
          onComplete={() => handleNextStep('location')}
          onSkip={handleSkip}
        />
      )}

      {currentStep === 'location' && (
        <LocationPermission onComplete={() => handleNextStep('login-choice')} onSkip={handleSkip} />
      )}

      {currentStep === 'login-choice' && <LoginChoice onComplete={handleComplete} />}
    </BaseLayout>
  );
}
