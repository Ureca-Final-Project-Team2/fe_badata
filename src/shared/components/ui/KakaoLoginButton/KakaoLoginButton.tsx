'use client';

import { useKakaoLogin } from '@features/auth/logics/useKakaoLogin';

export const KakaoLoginButton = () => {
  const handleLogin = useKakaoLogin();

  return (
    <button
      onClick={handleLogin}
      className="w-[300px] h-[45px] bg-yellow-400 text-black rounded-md hover:bg-yellow-300 transition"
    >
      카카오 로그인
    </button>
  );
};
