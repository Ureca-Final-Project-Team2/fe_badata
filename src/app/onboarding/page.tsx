'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { IndividualOnboardingSlides } from '@/features/onboarding/ui/IndividualOnboardingSlides';
import { IntroVideo } from '@/features/onboarding/ui/IntroVideo';
import { LocationPermission } from '@/features/onboarding/ui/LocationPermission';
import { LoginChoice } from '@/features/onboarding/ui/LoginChoice';
import { WelcomePage } from '@/features/onboarding/ui/WelcomePage';
import { useOnboarding } from '@/shared/hooks/useOnboarding';
import { BaseLayout } from '@/shared/ui/BaseLayout';

type OnboardingStep = 'intro' | 'welcome' | 'slides' | 'location' | 'login-choice';

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('intro');
  const router = useRouter();
  const { completeOnboarding, skipOnboarding } = useOnboarding();

  const handleNextStep = (step: OnboardingStep) => {
    setCurrentStep(step);
  };

  const handleComplete = () => {
    // 온보딩 완료 처리
    completeOnboarding();
    // 온보딩 완료 후 홈으로 이동
    router.push('/');
  };

  const handleSkip = () => {
    // 스킵 처리
    skipOnboarding();
    // 스킵 시 홈으로 이동
    router.push('/');
  };

  return (
    <BaseLayout
      header={null}
      paddingX={false}
      showBottomNav={false}
      showHeader={false}
      className="h-screen"
    >
      {currentStep === 'intro' && <IntroVideo onComplete={() => handleNextStep('welcome')} />}

      {currentStep === 'welcome' && (
        <WelcomePage onNext={() => handleNextStep('slides')} onSkip={handleSkip} />
      )}

      {currentStep === 'slides' && (
        <IndividualOnboardingSlides onComplete={() => handleNextStep('location')} />
      )}

      {currentStep === 'location' && (
        <LocationPermission onComplete={() => handleNextStep('login-choice')} onSkip={handleSkip} />
      )}

      {currentStep === 'login-choice' && <LoginChoice onComplete={handleComplete} />}
    </BaseLayout>
  );
}
