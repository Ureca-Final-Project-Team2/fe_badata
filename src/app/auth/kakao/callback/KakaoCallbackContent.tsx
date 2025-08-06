'use client';

import { useKakaoCallback } from '@/entities/auth/model/useKakaoCallback';
import { Spinner } from '@/shared/ui/Spinner/Spinner';

export default function KakaoCallbackContent() {
  // 카카오 콜백 처리
  useKakaoCallback();

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="text-center">
        <Spinner size="md" className="mx-auto mb-4" content="로그인 처리 중입니다..." />
      </div>
    </main>
  );
}
