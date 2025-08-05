'use client';

import { useKakaoCallback } from '@/entities/auth/model/useKakaoCallback';
import { useEffect } from 'react';

export default function KakaoCallbackContent() {
  // 카카오 콜백 처리
  useEffect(() => {
    useKakaoCallback();
  }, []);

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--main-5)] mx-auto mb-4"></div>
        <p className="text-[var(--main-5)]">로그인 처리 중입니다...</p>
      </div>
    </main>
  );
}
