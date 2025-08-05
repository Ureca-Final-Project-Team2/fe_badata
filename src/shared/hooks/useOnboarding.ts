'use client';

import { useCallback, useEffect, useState } from 'react';

const ONBOARDING_KEY = 'onboarding-completed';

export const useOnboarding = () => {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 온보딩 완료 여부 확인
  const checkOnboardingStatus = () => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(ONBOARDING_KEY) === 'true';
  };

  // 온보딩 완료 처리
  const completeOnboarding = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setIsOnboardingCompleted(true);
  };

  // 온보딩 스킵 처리
  const skipOnboarding = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setIsOnboardingCompleted(true);
  };

  // 온보딩 재시작 (개발용)
  const resetOnboarding = () => {
    localStorage.removeItem(ONBOARDING_KEY);
    setIsOnboardingCompleted(false);
  };

  // 온보딩이 필요하면 온보딩 페이지로 리다이렉트
  const redirectToOnboardingIfNeeded = useCallback(() => {
    // 이 함수는 더 이상 사용하지 않음
  }, []);

  useEffect(() => {
    const completed = checkOnboardingStatus();
    setIsOnboardingCompleted(completed);
    setIsLoading(false);
  }, []);

  return {
    isOnboardingCompleted,
    isLoading,
    completeOnboarding,
    skipOnboarding,
    resetOnboarding,
    redirectToOnboardingIfNeeded,
  };
};
