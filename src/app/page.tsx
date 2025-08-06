'use client';

import { useEffect, useRef } from 'react';

import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { useOnboarding } from '@/shared/hooks/useOnboarding';
import { isGuestMode } from '@/shared/lib/onboarding';

export default function HomePage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const hasLogged = useRef(false);
  const { isLoading } = useOnboarding();

  useEffect(() => {
    if (user && !hasLogged.current) {
      hasLogged.current = true;
    }
  }, [user]);

  // 리다이렉트 처리
  useEffect(() => {
    if (isLoading) return; // 로딩 중이면 아무것도 하지 않음

    if (user) {
      // 로그인된 사용자는 trade 페이지로
      router.replace('/trade');
    } else {
      // 게스트 모드인지 확인
      if (isGuestMode()) {
        // 게스트 모드인 경우 trade 페이지로 이동 (둘러보기 가능)
        router.replace('/trade');
      } else {
        // 로그인되지 않은 사용자는 온보딩으로
        router.replace('/onboarding');
      }
    }
  }, [user, isLoading, router]);

  // 로딩 중이거나 리다이렉트 중이면 아무것도 렌더링하지 않음
  if (isLoading || user) {
    return null;
  }

  // 로그인되지 않은 사용자는 홈 화면을 보여주지 않고 바로 온보딩으로
  return null;
}
