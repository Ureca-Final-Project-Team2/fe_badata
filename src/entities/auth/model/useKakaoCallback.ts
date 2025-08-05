'use client';

import { useEffect, useRef } from 'react';

import { useRouter } from 'next/navigation';

import { fetchFcmToken, fetchKakaoAuth } from '@/entities/auth/api/apis';
import { useAuthStore } from '@/entities/auth/model/authStore';
import { useFCM } from '@/shared/hooks/useFCM';

export const useKakaoCallback = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const { triggerFCMToken } = useFCM(); // 훅에서 함수만 가져옴
  const processedCode = useRef<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');

    if (!code || processedCode.current === code) {
      return;
    }
    processedCode.current = code;

    const handleAuth = async () => {
      try {
        const { accesstoken, content } = await fetchKakaoAuth(code);

        if (!accesstoken || !content) {
          router.replace('/onboarding');
          return;
        }

        localStorage.setItem('accessToken', accesstoken);
        login(accesstoken, content);

        // 로그인 성공 후 직접 FCM 토큰 생성
        try {
          const fcmToken = await triggerFCMToken();
          if (fcmToken) {
            await fetchFcmToken(fcmToken);
          }
        } catch (fcmError) {
          console.warn('FCM 토큰 처리 중 오류 발생:', fcmError);
          // FCM 오류는 로그인 성공에 영향을 주지 않음
        }

        // 리다이렉트 우선순위: URL 파라미터 > localStorage > 기본 로직
        const urlParams = new URLSearchParams(window.location.search);
        const redirect = urlParams.get('redirect');
        const savedRedirect = localStorage.getItem('redirectTo');

        if (redirect) {
          router.replace(redirect);
        } else if (savedRedirect) {
          localStorage.removeItem('redirectTo'); // 사용 후 삭제
          router.replace(savedRedirect);
        } else {
          // 온보딩 완료 상태 확인
          const isOnboardingCompleted = localStorage.getItem('onboarding-completed') === 'true';

          if (content.newUser && !isOnboardingCompleted) {
            // 새 사용자이고 온보딩이 완료되지 않은 경우에만 온보딩으로
            router.replace('/onboarding');
          } else {
            // 기존 사용자이거나 온보딩이 이미 완료된 경우 온보딩 완료 상태 설정하고 홈으로
            localStorage.setItem('onboarding-completed', 'true');
            router.replace('/');
          }
        }
      } catch (err) {
        console.error('카카오 로그인 실패:', err);

        // 네트워크 오류나 기타 오류 발생 시 온보딩 페이지로 돌아가기
        // 사용자에게 다시 시도할 수 있는 기회 제공
        setTimeout(() => {
          router.replace('/onboarding');
        }, 1000); // 1초 후 리다이렉트하여 오류 메시지가 보일 시간 제공
      }
    };

    handleAuth();
  }, [login, router, triggerFCMToken]);
};
