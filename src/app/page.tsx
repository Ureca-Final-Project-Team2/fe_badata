'use client';

import { useEffect, useRef } from 'react';

import { redirect } from 'next/navigation';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { useOnboarding } from '@/shared/hooks/useOnboarding';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header } from '@/shared/ui/Header';

export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  const hasLogged = useRef(false);
  const { isLoading, redirectToOnboardingIfNeeded } = useOnboarding();

  useEffect(() => {
    // 로딩이 완료되면 온보딩 필요 여부 확인
    if (!isLoading) {
      redirectToOnboardingIfNeeded();
    }

    if (user && !hasLogged.current) {
      console.log('현재 사용자 정보:', user);
      hasLogged.current = true;
    }
  }, [user, isLoading, redirectToOnboardingIfNeeded]);

  // 로딩 중이거나 온보딩으로 리다이렉트 중일 때는 아무것도 렌더링하지 않음
  if (isLoading) {
    return null;
  }

  // 사용자가 로그인되어 있으면 trade 페이지로 리다이렉트
  if (user) {
    redirect('/trade');
  }

  return (
    <BaseLayout header={<Header />} paddingX>
      홈화면
    </BaseLayout>
  );
}
