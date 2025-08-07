import { Suspense } from 'react';

import ReviewRegisterPageContent from '@/features/rental/store/register-review/_client/ReviewRegisterPageContent';
import { BaseLayout } from '@/shared/ui/BaseLayout';

export default function RegisterReviewPage() {
  return (
    <BaseLayout showHeader={false}>
      <Suspense fallback={<div>리뷰 등록 폼을 불러오는 중입니다...</div>}>
        <ReviewRegisterPageContent />
      </Suspense>
    </BaseLayout>
  );
}
