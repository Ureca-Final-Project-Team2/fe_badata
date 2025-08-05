'use client';

import { useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useAuthStore } from '@/entities/auth/model/authStore';
import { KakaoLoginButton } from '@/shared/ui/KakaoLoginButton';

export default function LandingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  // 이미 로그인된 경우 리다이렉트 처리
  useEffect(() => {
    if (isLoggedIn) {
      const redirect = searchParams?.get('redirect');
      if (redirect) {
        router.replace(redirect);
      } else {
        router.replace('/');
      }
    }
  }, [isLoggedIn, searchParams, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <KakaoLoginButton />
    </div>
  );
}
