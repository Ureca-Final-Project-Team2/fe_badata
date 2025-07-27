'use client';

import { useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { fetchKakaoAuth } from '@/entities/auth/api/auth';
import { useAuthStore } from '@/entities/auth/model/authStore';

export default function KakaoCallbackClient() {
  const searchParams = useSearchParams();
  const code = searchParams?.get('code');
  const router = useRouter();

  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const handleKakaoLogin = async () => {
      if (!code) return;

      try {
        const { accesstoken, content } = await fetchKakaoAuth(code);
        login(accesstoken, content);

        const redirectTo = localStorage.getItem('redirectTo') || '/';
        localStorage.removeItem('redirectTo');

        router.replace(redirectTo);
      } catch (error) {
        console.error('카카오 로그인 실패:', error);
        router.replace('/login?error=failed');
      }
    };

    handleKakaoLogin();
  }, [code, login, router]);

  return <div className="p-4 text-center">로그인 처리 중입니다...</div>;
}
