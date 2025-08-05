import { Suspense } from 'react';

import KakaoCallbackContent from '@/app/auth/kakao/callback/KakaoCallbackContent';
import { BaseLayout } from '@/shared/ui/BaseLayout';

// 로딩 컴포넌트를 별도로 분리하여 재사용성 향상
function LoadingSpinner() {
  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--main-5)] mx-auto mb-4"></div>
        <p className="text-[var(--main-5)]">준비 중...</p>
      </div>
    </main>
  );
}

export default function KakaoCallbackPage() {
  return (
    <BaseLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <KakaoCallbackContent />
      </Suspense>
    </BaseLayout>
  );
}
