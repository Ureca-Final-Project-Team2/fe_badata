export const dynamic = 'force-dynamic';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { fetchKakaoAuth } from '@features/auth/api/auth';
import { useAuthStore } from '@features/auth/model/authStore';
import KakaoCallbackClient from '@app/auth/kakao/callback/kakaoCallbackClient';
import { Suspense } from 'react';

export default function KakaoCallbackPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center">로그인 처리 중입니다...</div>}>
      <KakaoCallbackClient />
    </Suspense>
  );
}
