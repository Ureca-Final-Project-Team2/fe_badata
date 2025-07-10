'use client';

import { useKakaoCallback } from '@features/auth/logics/useKakaoCallback';

export default function KakaoCallbackPage() {
  useKakaoCallback();

  return <div className="p-10">로그인 처리 중입니다...</div>;
}
