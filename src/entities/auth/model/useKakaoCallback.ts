'use client';

import { useEffect, useRef } from 'react';

import { useRouter } from 'next/navigation';

import { fetchKakaoAuth } from '@/entities/auth/api/apis';
import { useAuthStore } from '@/entities/auth/model/authStore';
import { useFCM } from '@/shared/hooks/useFCM';

export const useKakaoCallback = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const { triggerFCMToken, sendFCMTokenToServer } = useFCM();
  const processedCode = useRef<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');

    if (!code || processedCode.current === code) return;

    processedCode.current = code;

    const handleAuth = async () => {
      try {
        // 카카오 로그인
        const { accesstoken, content } = await fetchKakaoAuth(code);

        if (!accesstoken || !content) {
          console.error('로그인 실패 - 유효하지 않은 응답');
          return;
        }

        // 로그인 완료
        login(accesstoken, content);

        // FCM 토큰 발급 트리거 (비동기)
        console.log('로그인 완료 후 FCM 토큰 발급 트리거');
        await triggerFCMToken();

        // 로그인 완료 후 FCM 토큰을 서버에 저장
        console.log('로그인 완료 후 FCM 토큰 서버 저장');
        await sendFCMTokenToServer();

        // 즉시 페이지 이동
        router.replace(content.newUser ? '/onboarding' : '/');
      } catch (err) {
        console.error('카카오 로그인 실패', err);
        alert('카카오 로그인 실패: ' + err);
      }
    };

    handleAuth();
  }, []); // 빈 의존성 배열로 변경
};
