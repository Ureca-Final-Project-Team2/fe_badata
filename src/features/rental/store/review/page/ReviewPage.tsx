'use client';

import { useMemo, useState } from 'react';

import { useParams } from 'next/navigation';

import { useAuthStore } from '@/entities/auth/model/authStore';
import {
  useInfiniteStoreReviews,
  useStoreReviewMeta,
} from '@/features/rental/store/review/model/queries';
import QuickReplySection from '@/features/rental/store/review/ui/QuickReplySection';
import ReviewHeaderSection from '@/features/rental/store/review/ui/ReviewHeaderSection';
import ReviewItem from '@/features/rental/store/review/ui/ReviewItem';

import type { ReviewSortType } from '@/features/rental/store/review/lib/types';

export default function ReviewPage() {
  const params = useParams();
  const storeId = Number(params?.storeId);
  const { user } = useAuthStore();
  const [selectedSort, setSelectedSort] = useState<ReviewSortType>('latest');

  const { data: metaData, isLoading: metaLoading } = useStoreReviewMeta(storeId);
  const {
    data: reviewsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: reviewsLoading,
  } = useInfiniteStoreReviews(storeId, 20, selectedSort);

  const allReviews = useMemo(() => {
    return reviewsData?.pages.flatMap((page) => page.showReviewResponses) ?? [];
  }, [reviewsData]);

  if (isNaN(storeId)) {
    return (
      <div className="p-4 text-center text-[var(--gray-mid)]">유효하지 않은 가맹점 ID입니다.</div>
    );
  }

  if (metaLoading || reviewsLoading) {
    return <div className="p-4 text-center">리뷰를 불러오는 중...</div>;
  }

  if (!metaData || !reviewsData) {
    return (
      <div className="p-4 text-center text-[var(--gray-mid)]">
        리뷰 데이터를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <>
      <QuickReplySection quickReplies={metaData.showCountPerQuickReplyResponses} />
      <ReviewHeaderSection
        reviewCount={metaData.reviewCount}
        currentSort={selectedSort}
        onSortChange={setSelectedSort}
      />

      <div className="space-y-6">
        {allReviews.length > 0 ? (
          <>
            {allReviews.map((review) => (
              <ReviewItem
                key={review.reviewId}
                review={review}
                isOwner={user?.userId === review.writerId}
              />
            ))}

            {hasNextPage && (
              <div className="text-center mt-6">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="px-6 py-3 text-[var(--gray)] rounded-lg hover:text-[var(--gray-dark)]"
                >
                  {isFetchingNextPage ? '로딩 중...' : '리뷰 더보기'}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8 text-[var(--gray-mid)]">아직 리뷰가 없습니다.</div>
        )}
      </div>
    </>
  );
}
