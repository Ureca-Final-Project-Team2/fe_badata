import { useCallback, useEffect, useRef } from 'react';

import { useUserCoinHistoryInfiniteQuery } from '@/features/mypage/coin-history/model/queries';
import { CoinHistoryItem } from '@/features/mypage/coin-history/ui/CoinHistoryItem';

export function CoinHistoryInfiniteList() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUserCoinHistoryInfiniteQuery();

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }, { threshold: 0.1 });
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

  if (isError) {
    return (
      <div className="bg-[var(--gray-light)] rounded-xl p-8 text-center">
        <p className="font-label-regular text-[var(--gray-dark)]">
          코인 내역을 불러오지 못했습니다.
        </p>
      </div>
    );
  }

  const allItems = data?.pages.flatMap((page) => page.item) || [];

  if (allItems.length === 0) {
    return (
      <div className="bg-[var(--gray-light)] rounded-xl p-8 text-center">
        <p className="font-label-regular text-[var(--gray-dark)]">코인 내역이 없습니다.</p>
      </div>
    );
  }

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
          <p className="font-small-regular text-[var(--gray-dark)]">로딩 중...</p>
        </div>
      )}
    </div>
  );
};