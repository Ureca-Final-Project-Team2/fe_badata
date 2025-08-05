'use client';

import { useEffect, useRef } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { fetchFcmToken, fetchKakaoAuth } from '@/entities/auth/api/apis';
import { useAuthStore } from '@/entities/auth/model/authStore';
import { useFCM } from '@/shared/hooks/useFCM';

export const useKakaoCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((state) => state.login);
  const { triggerFCMToken } = useFCM(); // ✅ 훅에서 함수만 가져옴
  const processedCode = useRef<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');

    if (!code || processedCode.current === code) return;
    processedCode.current = code;

    const handleAuth = async () => {
      try {
        const { accesstoken, content } = await fetchKakaoAuth(code);
        if (!accesstoken || !content) return;

        localStorage.setItem('accessToken', accesstoken);
        login(accesstoken, content);

        // ✅ 로그인 성공 후 직접 FCM 토큰 생성
        const fcmToken = await triggerFCMToken();
        if (fcmToken) {
          await fetchFcmToken(fcmToken);
        } else {
          console.warn(' 로그인은 성공했지만 FCM 토큰이 없어 서버 전송 생략');
        }

        // 리다이렉트 파라미터 확인
        const redirect = searchParams?.get('redirect');
        if (redirect) {
          router.replace(redirect);
        } else {
          router.replace(content.newUser ? '/onboarding' : '/');
        }
      } catch (err) {
        console.error('카카오 로그인 실패', err);
      }
    };

    handleAuth();
  }, [login, router, triggerFCMToken, searchParams]);
};
