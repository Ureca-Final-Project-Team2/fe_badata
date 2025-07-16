'use client';

import { fetchKakaoAuth } from '@features/auth/api/auth';
import { useAuthStore } from '@features/auth/model/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useKakaoCallback = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    if (!code) return;

    const handleAuth = async () => {
      try {
        const { accesstoken, content } = await fetchKakaoAuth(code);

        if (!accesstoken || !content) {
          console.error('로그인 실패 - 유효하지 않은 응답');
          return;
        }

        localStorage.setItem('accessToken', accesstoken);
        login(accesstoken, content);

        router.replace(content.newUser ? '/onboarding' : '/');
      } catch (err) {
        console.error('카카오 로그인 실패', err);
      }
    };

    handleAuth();
  }, []);
};
