import React from 'react';

import { STORE_DETAIL_MESSAGES } from '@/features/rental/store/store-detail/lib/storeDetailConstants';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { Header_Detail } from '@/shared/ui/Header_Detail';

/**
 * 로딩 상태 컴포넌트
 */
export const StoreDetailLoading = React.memo(() => (
  <BaseLayout
    header={<Header_Detail title={STORE_DETAIL_MESSAGES.HEADER_LOADING} />}
    paddingX={false}
  >
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-[var(--main-5)] border-t-transparent rounded-full animate-spin" />
        <div>{STORE_DETAIL_MESSAGES.LOADING}</div>
      </div>
    </div>
  </BaseLayout>
));

StoreDetailLoading.displayName = 'StoreDetailLoading';

/**
 * 에러 상태 컴포넌트
 */
export const StoreDetailError = React.memo(() => (
  <BaseLayout
    header={<Header_Detail title={STORE_DETAIL_MESSAGES.HEADER_ERROR} />}
    paddingX={false}
  >
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="text-gray-600">{STORE_DETAIL_MESSAGES.ERROR}</div>
        <button
          className="px-4 py-2 bg-[var(--main-5)] text-white rounded-lg text-sm font-medium hover:bg-[var(--main-4)] transition-colors"
          onClick={() => window.location.reload()}
        >
          다시 시도
        </button>
      </div>
    </div>
  </BaseLayout>
));

StoreDetailError.displayName = 'StoreDetailError';
