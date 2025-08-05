export const useKakaoLogin = () => {
  return () => {
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

    // 온보딩 페이지에서 로그인하는 경우 홈으로 리다이렉트
    const currentPath = window.location.pathname;
    const redirectPath = currentPath === '/onboarding' ? '/' : currentPath;
    localStorage.setItem('redirectTo', redirectPath);

    const kakaoAuthUrl = `${AUTH_URL}?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
    window.location.href = kakaoAuthUrl;
  };
};
