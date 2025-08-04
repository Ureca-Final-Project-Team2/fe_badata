'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useLikedTradePosts } from '@/features/mypage/like-trade-post/model/queries';
import { BaseLayout } from '@/shared/ui/BaseLayout';
import { PageHeader } from '@/shared/ui/Header';
import TradePostCard from '@/widgets/trade/ui/TradePostCard';

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

  if (isLoading && !cursor) return <div>로딩중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <BaseLayout header={<PageHeader title="찜 목록" onBack={handleBack} />} showBottomNav>
      {!likeTradePostItems || likeTradePostItems.length === 0 ? (
        <div className="py-4 text-center text-[var(--gray)]">게시물이 없습니다.</div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-5 mt-4">
            {likeTradePostItems.map((item) => (
              <TradePostCard
                key={item.postId}
                imageUrl={item.postImage}
                title={item.title}
                partner={item.partner}
                price={item.price}
                likeCount={item.postLikes}
                isLiked={true}
                hasDday={false}
                dday={0}
              />
            ))}
          </div>

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
    </BaseLayout>
  );
}
