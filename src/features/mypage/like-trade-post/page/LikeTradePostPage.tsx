'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useLikedTradePosts } from '@/features/mypage/like-trade-post/model/queries';
import { PATH } from '@/shared/config/path';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';
import { TradePostCardSkeleton } from '@/shared/ui/Skeleton/TradePostCardSkeleton';
import TradePostCard from '@/widgets/trade/ui/TradePostCard';

import type { MobileCarrier } from '@/features/trade/register/data/lib/types';

// 공통 메시지 컴포넌트
const CenteredMessage = ({ children }: { children: React.ReactNode }) => (
  <div className="text-center py-8">
    <p className="font-label-regular text-[var(--gray)]">{children}</p>
  </div>
);

export default function LikeTradePostPage() {
  const router = useRouter();
  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const { likeTradePostItems, nextCursor, hasNext, isLoading, isError } =
    useLikedTradePosts(cursor);

  const handleLoadMore = () => {
    if (hasNext && nextCursor) {
      setCursor(nextCursor);
    }
  };

  const handleBack = () => router.back();

  const handlePostClick = (postId: number, postCategory: 'GIFTICON' | 'DATA') => {
    if (postCategory === 'DATA') {
      router.push(PATH.TRADE.DATA_DETAIL.replace(':id', postId.toString()));
    } else {
      router.push(PATH.TRADE.GIFTICON_DETAIL.replace(':id', postId.toString()));
    }
  };

  return (
    <BaseLayout header={<PageHeader title="찜 목록" onBack={handleBack} />} showBottomNav>
      <div className="pb-[96px]">
        {/* 로딩 상태 (초기 로딩) */}
        {isLoading && !cursor && (
          <div className="grid grid-cols-2 gap-5 mt-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <TradePostCardSkeleton key={index} />
            ))}
          </div>
        )}

        {/* 에러 상태 */}
        {isError && <CenteredMessage>에러가 발생했습니다.</CenteredMessage>}

        {/* 빈 상태 */}
        {!isLoading && !isError && (!likeTradePostItems || likeTradePostItems.length === 0) && (
          <CenteredMessage>찜 목록이 없습니다.</CenteredMessage>
        )}

        {/* 데이터 표시 */}
        {!isLoading && !isError && likeTradePostItems && likeTradePostItems.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-5 mt-4">
              {likeTradePostItems.map((item) => (
                <div
                  key={item.postId}
                  onClick={() => handlePostClick(item.postId, item.postCategory)}
                  className="cursor-pointer"
                >
                  <TradePostCard
                    imageUrl={item.postImage}
                    title={item.title}
                    partner={item.partner}
                    mobileCarrier={item.mobileCarrier as MobileCarrier}
                    price={item.price}
                    likeCount={item.postLikes}
                    isLiked={true}
                    hasDday={false}
                    dday={0}
                  />
                </div>
              ))}
            </div>

            {/* 더보기 버튼 */}
            {hasNext && (
              <div className="mt-6 text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="px-6 py-2 bg-[var(--main-5)] text-[var(--white)] rounded-lg disabled:opacity-50"
                >
                  {isLoading ? '로딩중...' : '더보기'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </BaseLayout>
  );
}
