'use client';

import { Suspense } from 'react';

import { useKakaoCallback } from './useKakaoCallback';

function KakaoCallbackHandler() {
  useKakaoCallback();
  return null;
}

export const useKakaoCallbackWithSuspense = () => {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>로그인 처리 중...</p>
        </div>
      </div>
    }>
      <KakaoCallbackHandler />
    </Suspense>
  );
}; 