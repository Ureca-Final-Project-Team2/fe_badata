import { useCallback, useEffect, useRef } from 'react';

import { useUserCoinHistoryInfiniteQuery } from '@/features/mypage/coin-history/model/queries';
import { CoinHistoryItem } from '@/features/mypage/coin-history/ui/CoinHistoryItem';

// 공통 메시지 컴포넌트
const CenteredMessage = ({ children }: { children: React.ReactNode }) => (
  <div className="text-center py-8">
    <p className="font-label-regular text-[var(--gray)]">{children}</p>
  </div>
);

export function CoinHistoryInfiniteList() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useUserCoinHistoryInfiniteQuery();

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        },
        { threshold: 0.1 },
      );
      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="h-16 bg-[var(--main-1)] rounded-xl"></div>
          </div>
        ))}
      </div>
    );
  }

  // 에러 상태
  if (isError) {
    return <CenteredMessage>코인 내역을 불러오지 못했습니다.</CenteredMessage>;
  }

  const allItems = data?.pages.flatMap((page) => page.item) || [];

  // 빈 상태
  if (allItems.length === 0) {
    return <CenteredMessage>코인 내역이 없습니다.</CenteredMessage>;
  }

  // 정상 상태
  return (
    <div className="space-y-3">
      {allItems.map((item, index) => {
        if (index === allItems.length - 1) {
          return (
            <div key={item.id} ref={lastElementRef}>
              <CoinHistoryItem item={item} />
            </div>
          );
        }
        return <CoinHistoryItem key={item.id} item={item} />;
      })}
      {isFetchingNextPage && (
        <div className="text-center py-4">
          <p className="font-small-regular text-[var(--gray)]">로딩 중...</p>
        </div>
      )}
    </div>
  );
}
