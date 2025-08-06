'use client';

import { lazy, Suspense, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useOnboarding } from '@/shared/hooks/useOnboarding';
import { BaseLayout } from '@/shared/ui/BaseLayout';

// Lazy loaded components for performance optimization
const IndividualOnboardingSlides = lazy(() =>
  import('@/features/onboarding/ui/IndividualOnboardingSlides').then((module) => ({
    default: module.IndividualOnboardingSlides,
  })),
);
const IntroVideo = lazy(() =>
  import('@/features/onboarding/ui/IntroVideo').then((module) => ({ default: module.IntroVideo })),
);
const LocationPermission = lazy(() =>
  import('@/features/onboarding/ui/LocationPermission').then((module) => ({
    default: module.LocationPermission,
  })),
);
const LoginChoice = lazy(() =>
  import('@/features/onboarding/ui/LoginChoice').then((module) => ({
    default: module.LoginChoice,
  })),
);
const WelcomePage = lazy(() =>
  import('@/features/onboarding/ui/WelcomePage').then((module) => ({
    default: module.WelcomePage,
  })),
);

// Loading fallback component
const OnboardingLoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-gray-500">온보딩 로딩 중...</div>
  </div>
);

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
      <Suspense fallback={<OnboardingLoadingFallback />}>
        {currentStep === 'intro' && <IntroVideo onComplete={() => handleNextStep('welcome')} />}

        {currentStep === 'welcome' && (
          <WelcomePage
            onNext={() => handleNextStep('slides')}
            onSkip={() => handleNextStep('location')}
          />
        )}

        {currentStep === 'slides' && (
          <IndividualOnboardingSlides onComplete={() => handleNextStep('location')} />
        )}

        {currentStep === 'location' && (
          <LocationPermission
            onComplete={() => handleNextStep('login-choice')}
            onSkip={handleSkip}
          />
        )}

        {currentStep === 'login-choice' && <LoginChoice onComplete={handleComplete} />}
      </Suspense>
    </BaseLayout>
  );
}
