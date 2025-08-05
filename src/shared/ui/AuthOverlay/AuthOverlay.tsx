'use client';

import { usePathname } from 'next/navigation';

import { LoginPrompt } from './LoginPrompt';

export const AuthOverlay = () => {
  const pathname = usePathname();

  // 홈/마이페이지에서는 z-index를 낮게, 다른 페이지에서는 높게 설정
  const isHomeOrMypage = pathname === '/' || pathname === '/mypage';
  const zIndex = isHomeOrMypage ? 'z-40' : 'z-70';

  const handleKakaoLogin = () => {
    // 카카오 로그인 실행
    const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
    const REDIRECT_URI =
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI_RELEASE
        : process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
    const AUTH_URL = process.env.NEXT_PUBLIC_KAKAO_AUTH_URL;

    if (!REST_API_KEY || !REDIRECT_URI || !AUTH_URL) {
      console.error('카카오 로그인 환경변수 누락');
      return;
    }

    // 현재 페이지 정보 저장 (API 엔드포인트가 아닌 현재 페이지 경로)
    const currentPath = window.location.pathname;
    localStorage.setItem('redirectTo', currentPath);

    const kakaoAuthUrl = `${AUTH_URL}?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div
      className={`fixed inset-0 ${zIndex} flex items-center justify-center bg-[var(--black)]/50`}
    >
      <LoginPrompt onLogin={handleKakaoLogin} />
    </div>
  );
};
