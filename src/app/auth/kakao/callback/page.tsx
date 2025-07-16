export const dynamic = 'force-dynamic';

import KakaoCallbackClient from '@app/auth/kakao/callback/kakaoCallbackClient';
import { Suspense } from 'react';

export default function KakaoCallbackPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center">로그인 처리 중입니다...</div>}>
      <KakaoCallbackClient />
    </Suspense>
  );
}
