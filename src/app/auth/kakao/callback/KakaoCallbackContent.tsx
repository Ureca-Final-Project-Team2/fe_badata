'use client';

import { useEffect, useState } from 'react';

import { useKakaoCallback } from '@/entities/auth/model/useKakaoCallback';

export default function KakaoCallbackContent() {
  const [isClient, setIsClient] = useState(false);

  // 클라이언트 사이드에서만 실행되도록 보장
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 카카오 콜백 처리 (클라이언트에서만 실행)
  useKakaoCallback();

  // 서버 사이드 렌더링 중에는 최소한의 로딩 UI만 표시
  if (!isClient) {
    return (
      <main className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--main-5)] mx-auto mb-4"></div>
          <p className="text-[var(--main-5)]">페이지 로딩 중...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--main-5)] mx-auto mb-4"></div>
        <p className="text-[var(--main-5)]">로그인 처리 중입니다...</p>
      </div>
    </main>
  );
}
